import { useState } from "react";
import { motion } from "framer-motion";

// Función para convertir la cadena de transformación a un objeto { rotate, x }
const parseTransform = (transformStr) => {
    let rotate = 0;
    let x = 0;
    const rotateMatch = transformStr.match(/rotate\(([-0-9.]+)deg\)/);
    if (rotateMatch) {
        rotate = parseFloat(rotateMatch[1]);
    }
    const translateMatch = transformStr.match(/translate\(([-0-9.]+)px\)/);
    if (translateMatch) {
        x = parseFloat(translateMatch[1]);
    }
    return { rotate, x };
};

const getNoRotationTransform = (transformObj) => {
    return { ...transformObj, rotate: 0 };
};

const getPushedTransform = (transformObj, offsetX) => {
    return { ...transformObj, x: transformObj.x + offsetX };
};

export default function BounceCards({
    className = "",
    images = [],
    containerWidth = 400,
    containerHeight = 400,
    animationDelay = 0.5,
    animationStagger = 0.06,
    transformStyles = [
        "rotate(10deg) translate(-170px)",
        "rotate(5deg) translate(-85px)",
        "rotate(-3deg)",
        "rotate(-10deg) translate(85px)",
        "rotate(2deg) translate(170px)",
    ],
    enableHover = false,
    handleSelectedCardInfo
}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Parseamos las transformaciones a objetos numéricos
    const parsedTransforms = transformStyles.map((str) => parseTransform(str));

    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: containerWidth, height: containerHeight }}
            initial="hidden"
            animate="show"
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: animationStagger,
                        delayChildren: animationDelay,
                    },
                },
            }}
        >
            {images.map((src, i) => {
                const base = parsedTransforms[i] || { rotate: 0, x: 0 };
                let target = base;
                let transition = { type: "spring", stiffness: 300, damping: 20 };

                if (enableHover && hoveredIndex !== null) {
                    if (i === hoveredIndex) {
                        target = getNoRotationTransform(base);
                    } else {
                        const offsetX = i < hoveredIndex ? -160 : 160;
                        target = getPushedTransform(base, offsetX);
                        transition = {
                            duration: 0.4,
                            ease: [0.175, 0.885, 0.32, 1.275], // Aproximación a back.out(1.4)
                            delay: Math.abs(i - hoveredIndex) * 0.05,
                        };
                    }
                }

                const isSelected = selectedIndex === i;
                const totalCards = images.length;
                const baseIndexZ = 1;

                return (
                    <motion.div
                        key={i}
                        className={`card card-${i} absolute w-[200px] aspect-square border-8 rounded-[30px] overflow-hidden cursor-pointer`}
                        style={{
                            boxShadow: isSelected
                                ? "0 10px 20px rgba(0,0,0,0.5)"
                                : "0 4px 10px rgba(0,0,0,0.2)",
                            borderColor: isSelected ? "#e9b253" : "#8F272A",
                            zIndex: isSelected ? 100 : (selectedIndex === 0 ? (totalCards - i) : (baseIndexZ + i)),
                        }}
                        initial={{ scale: 0, rotate: base.rotate, x: base.x }}
                        animate={{
                            scale: isSelected ? 1.05 : 1,
                            rotate: target.rotate,
                            x: target.x,
                        }}
                        transition={transition}
                        onMouseEnter={() => enableHover && setHoveredIndex(i)}
                        onMouseLeave={() => enableHover && setHoveredIndex(null)}
                        onClick={() => {
                            setSelectedIndex(i);
                            handleSelectedCardInfo(i);
                        }}
                    >
                        <img className="w-full h-full object-cover" src={src} alt={`card-${i}`} />
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
