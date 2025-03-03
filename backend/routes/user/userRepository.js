import { AppError } from "../../errors/appError.js";
import supabase from "../supabaseClient.js";

// La duración de las cookies en JavaScript se establece en milisegundos (ms).
// Calculamos el equivalente a 1 hora
// - 1 hora tiene 60 minutos
// - Cada minuto tiene 60 segundos
// - Cada segundo tiene 1000 milisegundos

const DURATION_ACCESS_COOKIE = 60 * 60 * 1000;

// Calculamos el tiempo equivalente a 1 semana:
// - 7 días
// - Cada día tiene 24 horas
// - Cada hora tiene 60 minutos
// - Cada minuto tiene 60 segundos
// - Cada segundo tiene 1000 milisegundos

const DURATION_REFRESH_COOKIE = 7 * 24 * 60 * 60 * 1000;

// ambas constantes representan las duraciones en ms de las cookies utilizadas
export class UserRepository {
  static async createAuthenticatedUser({ username, email, password }) {
    // Validaciones para nombre de usuario (ver librerias para validaciones completas (como zod, aunque este es con TS))
    if (typeof username !== "string")
      return {
        status: 400,
        message:
          "Formato de campo inválido. El nombre de usuario tiene que ser una cadena de texto.",
      };

    if (!/^[a-zA-Z0-9_.-]{3,20}$/.test(username))
      return {
        status: 400,
        message:
          "Nombre de usuario no válido. No se admiten caracteres especiales.",
      };

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/.test(
        password
      )
    )
      return { status: 400, message: "Contraseña insegura." };

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error)
      return {
        status: 500,
        message: "Error en la autenticación de la cuenta. " + error,
      };
    // Verificar si el usuario ya existe
    const { data: existingUsername } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username);

    if (existingUsername && existingUsername.length > 0)
      return {
        status: 400,
        message:
          "Nombre de usuario ya ocupado - Usuario ya existente en la BD.",
      };

    return {
      status: 200,
      message:
        "Datos de usuario recibidos correctamente. Esperando confirmación por correo para finalizar la autenticación",
    };
  }

  // Metodo encargado de añadir a la tabla de "profiles" en la BD solo a aquellos usuarios con autenticación CONFIRMADA.
  static async createProfile({ userId, newEmail, old_record }) {
    // Consulta si ya existe un perfil asociado al usuario
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id, username")
      .eq("user_id", userId);

    if (fetchError) {
      console.error("Error fetching profile:", fetchError.message);
      return { status: 500, message: "Failed to fetch profile" }; //res.status(500).json({ error: "Failed to fetch profile" });
    }

    if (existingProfile !== "") {
      // Si no existe, inserta un nuevo perfil
      const { error: insertError } = await supabase.from("profiles").insert({
        user_id: userId,
        username: newEmail,
        role: "user",
      });

      if (insertError) {
        console.error("Error inserting profile:", insertError.message);
        return { status: 500, message: "Failed to create profile" }; //res.status(500).json({ error: "Failed to create profile" });
      }

      return { status: 200, message: "Profile created successfully" }; //res.status(200).json({ message: "Profile created successfully" });
    } else if (old_record && old_record.email !== newEmail) {
      // Si ya existe el perfil y el correo ha cambiado, actualiza el email
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username: newEmail })
        .eq("user_id", userId);

      if (updateError) {
        console.error("Error updating profile:", updateError.message);
        return { status: 500, message: "Failed to update profile" }; //res.status(500).json({ error: "Failed to update profile" });
      }

      return { status: 200, message: "Profile updated successfully" }; //res.status(200).json({ message: "Profile updated successfully" });
    }

    return { status: 400, message: "Invalid event or no action required" };
  }

  static async logIn({ username, password, res }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
      /*
        const access_token = data.session.access_token;
        const refresh_token = data.session.refresh_token;
        */
      let resMessage = "Log In correcto";
      let resCode = 200;
      if (error) {
        throw new AppError(401, error.status, "Sus credenciales son inválidas");
        // resCode = 401;
        // resMessage = "Sus credenciales son inválidas";
      } else {
        res.cookie("access_token", data.session.access_token, {
          httpOnly: true,
          secure: true, // cambiar a true en producción
          maxAge: DURATION_ACCESS_COOKIE,
          sameSite: "None",
        });
        res.cookie("refresh_token", data.session.refresh_token, {
          httpOnly: true,
          secure: true, // cambiar a true en producción
          maxAge: DURATION_REFRESH_COOKIE,
          sameSite: "None",
        });
      }
      // Aca se retorna tanto para los casos de credenciales correctas, como incorrectas, puesto que lo importante es si el servidor funciona correctamente?.
      return { status: resCode, message: resMessage };
      //return { access_token, refresh_token};
    } catch (e) {
      throw e;
    }
  }

  static async logOut(access_token, res) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser(access_token);
      if (user) {
        const { error } = await supabase.auth.signOut();
        if (error) throw new AppError(error.code, error.status, error.code);
        else {
          res.clearCookie("access_token", {
            httpOnly: true,
            secure: true, // Cambiar a true en producción
            maxAge: DURATION_REFRESH_COOKIE, // Largo para refresh token
            sameSite: "None",
          });
          res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: true, // Cambiar a true en producción
            maxAge: DURATION_REFRESH_COOKIE, // Largo para refresh token
            sameSite: "None",
          });
          return { status: 200, message: "Sesión cerrada con éxito" };
        }
      } else {
        throw new AppError("NoSessionError", 400, "No hay una sesión activa");
      }
    } catch (e) {
      throw e;
    }
  }

  static async refreshUserCookie(token, refToken, res) {
    // Verifica el acceso del usuario con el access_token

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (!token || error) {
      try {
        if (!refToken) {
          throw new AppError("unauthorized", 401, "Inicie sesión nuevamente");
        }
        // Intenta refrescar la sesión usando el refresh_token
        const { data, error } = await supabase.auth.refreshSession({
          refresh_token: refToken,
        });

        if (error) {
          res.clearCookie("access_token", {
            httpOnly: true,
            secure: true, // Cambiar a true en producción
            maxAge: DURATION_REFRESH_COOKIE, // Largo para refresh token
            sameSite: "None",
          });
          res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: true, // Cambiar a true en producción
            maxAge: DURATION_REFRESH_COOKIE, // Largo para refresh token
            sameSite: "None",
          });
          throw new AppError("unauthorized", 401, "Usuario no autorizado");
        }

        const { session, user } = data;

        // Establece las cookies con los nuevos tokens
        res.cookie("access_token", session.access_token, {
          httpOnly: true,
          secure: true, // Cambiar a true en producción
          maxAge: DURATION_ACCESS_COOKIE, // 20 minutos para la cookie de access_token
          sameSite: "None",
        });

        res.cookie("refresh_token", session.refresh_token, {
          httpOnly: true,
          secure: true, // Cambiar a true en producción
          maxAge: DURATION_REFRESH_COOKIE, // Largo para refresh token
          sameSite: "None",
        });

        res.send({ message: "Refresco exitoso" });
      } catch (err) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        throw err;
      }
    }

    return { data: true }; // Sesión verificada con éxito
  }
}
