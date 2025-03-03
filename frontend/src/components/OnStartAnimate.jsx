"use client"

import { motion } from "motion/react";
import App from "../App";

export default function OnStartAnimate() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
        >
            <App />
        </motion.div>
    )
}