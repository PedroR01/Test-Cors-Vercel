import { useState } from "react";
import Button from "../Button";

import peralta from "../../img/galeria/adriana_peralta.png";
import arce_sucundun from "../../img/galeria/agustina_arce_sucundun.png";
import arce_lobo from "../../img/galeria/agustina_arce_lobo.png";
import astengo_ladronDeMisSueños from "../../img/galeria/astengo_ladronDeMisSueños.png";
import brenda_lita from "../../img/galeria/brenda_lita.png";
import candelaria_funes_yoHagoRavioles from "../../img/galeria/candelaria_funes_yoHagoRavioles.png";
import cecilia_oviedo_laCocaEsPalFernet from "../../img/galeria/cecilia_oviedo_laCocaEsPalFernet.png";
import clara_sanchez_laPicadita from "../../img/galeria/clara_sanchez_laPicadita.png";
import cukier_singer from "../../img/galeria/cukier_singer.png";
import elina_moncada_tango from "../../img/galeria/elina_moncada_tango.png";
import eugenia_olha_gladis from "../../img/galeria/eugenia_olha_gladis.png";
import fabian_segovia_indio from "../../img/galeria/fabian_segovia_indio.png";
import fabio_correa_andaACantarleAGardel from "../../img/galeria/fabio_correa_andaACantarleAGardel.png";
import graciela_chaile_puente from "../../img/galeria/graciela_chaile_puente.png";
import hector_villarino_bajoDeTobias from "../../img/galeria/hector_villarino_bajoDeTobias.png";
import hector_villarino_magicamenteMessi from "../../img/galeria/hector_villarino_magicamenteMessi.png";
import hidalgo_cambalanche from "../../img/galeria/hidalgo_cambalache.png";
import janet_mehl_mafalda from "../../img/galeria/janet_mehl_mafalda.png";
import jimena_silva_pasionArgentina from "../../img/galeria/jimena_silva_pasionArgentina.png";
import juanjo_miraballes_elFirulete from "../../img/galeria/juanjo_miraballes_elFirulete.png";
import karen_alvarado_laParrilla from "../../img/galeria/karen_alvarado_laParrillaDeBalto.png";
import laura_caiafa_siempre from "../../img/galeria/laura_caiafa_siempreBuscandoleElPeloAlHuevo.png";
import lucila_tagliani_esCorta from "../../img/galeria/lucila_tagliani_esCortaLaBocha.png";
import maria_celia_medeot_oid from "../../img/galeria/maria_celia_medeot_oidMortales.png";
import mario_daniel_obelar_laMilanga from "../../img/galeria/mario_daniel_obelar_laMilanga.png";
import milagros_olmos_aMatear from "../../img/galeria/milagros_olmos_aMatearMiAmor.png";
import monica_mariela_davila_tierra from "../../img/galeria/monica_mariela_davila_tierraDelSolDelVinoYDeLosAndes.png";
import nancy_baez_pasionAzulgrana from "../../img/galeria/nancy_baez_pasiónAzulgrana.png";
import paula_lopez_zorzalColorado from "../../img/galeria/paula_lopez_zorzalColorado.png";
import rogelio_estrada_parrillaElDiez from "../../img/galeria/rogelio_estrada_parrillaElDiez.png";
import sabrina_giorgio_canoa from "../../img/galeria/sabrina_giorgio_canoa.png";
import silvia_fernandez_prohibidoOlvidar from "../../img/galeria/silvia_fernandez_prohibidoOlvidar.png";
import skarek_lograr from "../../img/galeria/skarek_lograr.png";
import veronica_garcia_descubriendoElArte from "../../img/galeria/veronica_garcia_descubriendoElArteCadaDia.png";
import zavalla_laAmistad from "../../img/galeria/zavalla_laAmistad.png";
export default function Galeria() {
  const imagenes = [{ id: 1, src: peralta, autor: "Adriana Peralta", titulo: "" },
  { id: 2, src: arce_sucundun, autor: "M. Agustina Arce T.", titulo: "Sacundún" },
  { id: 3, src: arce_lobo, autor: "M. Agustina Arce T.", titulo: "Lobo" },
  { id: 4, src: astengo_ladronDeMisSueños, autor: "Elizabeth Araceli Astengo", titulo: "Ladrón de mis sueños" },
  { id: 5, src: brenda_lita, autor: "Brenda Soledad Gallo", titulo: "Lita" },
  { id: 6, src: candelaria_funes_yoHagoRavioles, autor: "Candelaria Funes Herrera", titulo: "Yo hago ravioles..." },
  { id: 7, src: cecilia_oviedo_laCocaEsPalFernet, autor: "Cecilia Oviedo", titulo: "La coca es pal fernet" },
  { id: 8, src: clara_sanchez_laPicadita, autor: "Clara Elizabet Sánchez", titulo: "La Picadita" },
  { id: 9, src: cukier_singer, autor: "Jorge Cukier", titulo: "Singer" },
  { id: 10, src: elina_moncada_tango, autor: "Elina Moncada", titulo: "Tango" },
  { id: 11, src: eugenia_olha_gladis, autor: "Maria Eugenia Olha", titulo: "Gladis" },
  { id: 12, src: fabian_segovia_indio, autor: "Néstor Fabián Segovia", titulo: "Indio" },
  { id: 13, src: fabio_correa_andaACantarleAGardel, autor: "Fabio Rodolfo Correa", titulo: "Anda a cantarle a Gardel" },
  { id: 14, src: graciela_chaile_puente, autor: "Graciela del Carmen Chaile", titulo: "Puente" },
  { id: 15, src: hector_villarino_bajoDeTobias, autor: "Héctor Villarino", titulo: "Bajo de Tobías" },
  { id: 16, src: karen_alvarado_laParrilla, autor: "Karen Alvarado Zamora", titulo: "La Parrilla de Balto" },
  { id: 17, src: laura_caiafa_siempre, autor: "Laura Caiafa", titulo: "Siempre buscándole el pelo al huevo" },
  { id: 18, src: lucila_tagliani_esCorta, autor: "Lucila Tagliani", titulo: "Es corta la bocha" },
  { id: 19, src: maria_celia_medeot_oid, autor: "Maria Celia Medeot", titulo: "Oid Mortales" },
  { id: 20, src: mario_daniel_obelar_laMilanga, autor: "Mario Daniel Obelar", titulo: "La milanga" },
  { id: 21, src: milagros_olmos_aMatear, autor: "María Milagros Olmos", titulo: "A matear mi amor" },
  { id: 22, src: monica_mariela_davila_tierra, autor: "Mónica Mariela Dávila", titulo: "Tierra del sol, del vino y de los Andes" },
  { id: 23, src: nancy_baez_pasionAzulgrana, autor: "Nancy Elena Baez", titulo: "Pasión Azulgrana" },
  { id: 24, src: paula_lopez_zorzalColorado, autor: "María Paula López", titulo: "Zorzal colorado" },
  { id: 25, src: rogelio_estrada_parrillaElDiez, autor: "Rogelio Naranjo Estrada", titulo: "Parrilla El Diez" },
  { id: 26, src: sabrina_giorgio_canoa, autor: "Sabrina Giorgio", titulo: "Canoa" },
  { id: 27, src: silvia_fernandez_prohibidoOlvidar, autor: "Silvia Fernández", titulo: "Prohibido olvidar" },
  { id: 28, src: skarek_lograr, autor: "Sandra Paola Skarek", titulo: "Lograr" },
  { id: 29, src: veronica_garcia_descubriendoElArte, autor: "Verónica García", titulo: "Descubriendo el arte cada día" },
  { id: 30, src: zavalla_laAmistad, autor: "Graciela Edith Zavalla", titulo: "La Amistad" },
  { id: 31, src: hector_villarino_magicamenteMessi, autor: "Héctor Villarino", titulo: "Magicamente Messi" },
  { id: 32, src: hidalgo_cambalanche, autor: "Luis Alberto Hidalgo", titulo: "Cambalache" },
  { id: 33, src: janet_mehl_mafalda, autor: "Janet Inés Mehi", titulo: "Mafalda" },
  { id: 34, src: jimena_silva_pasionArgentina, autor: "Jimena Silva", titulo: "Pasión Argentina" },
  { id: 35, src: juanjo_miraballes_elFirulete, autor: "Juanjo Miraballes", titulo: "El Firulete..." },
  ]
  const [cantVisible, setCant] = useState(16);
  const [verMas, setVerMas] = useState(false);

  // Función para cargar más imágenes
  const cargarMasImagenes = () => {
    setVerMas(true);
    setCant((cantVisible) => cantVisible + 4);
  };

  return (
    <section className="">
      {/* Grilla principal */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {imagenes.slice(0, cantVisible).map((img) => (
          <div key={img.id} className="relative group overflow-hidden max-sm:h-[20vh] sm:h-[40vh] transition transform hover:scale-105">
            <img
              src={img.src}
              alt={img.titulo}
              className="w-full border-solid border-2 border-black object-fill h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-55 transition-opacity flex flex-col justify-end">
              <p className="afacad-bold absolute top-2 left-2 text-[#CDA053] text-sm p-1 rounded">
                {img.autor}
              </p>
              <p className="afacad-normal absolute bottom-1 left-1 text-[#FEFFEB] text-base p-2 rounded w-3/4">
                {`"${img.titulo}"`}
              </p>
            </div>
          </div>
        ))}
      </div>



      {/* Imágenes parcialmente visibles */}
      <div className="grid grid-cols-2 max-sm:h-[7vh] sm:h-[7vh] md:h-[10vh] lg:h-[12vh] xl:h-[15]">
        {imagenes.slice(cantVisible, cantVisible + 2).map((img) => (
          <div
            key={img.id}
            className="relative group overflow-hidden transition transform hover:scale-105"
          >
            <img
              src={img.src}
              alt={img.titulo}
              className="w-full border-solid border-2 border-black"
            />
            <div className="absolute inset-0 bg-black bg-opacity-55 transition-opacity flex flex-col justify-end"></div>
          </div>
        ))}
      </div>

      {/* Botón Ver más */}
      {cantVisible < 34 && (
        <div className="flex justify-center relative">
          <div
            className={`absolute bottom-[30px] w-auto flex justify-center translate-y-0
        transition-all duration-500 ease-in-out`}
          >
            <Button
              text={"Ver más"}
              btnType={"button"}
              event={cargarMasImagenes}
            />
          </div>
        </div>
      )}

    </section>
  );
}
