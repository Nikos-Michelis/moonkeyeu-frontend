import { motion } from 'framer-motion';

const MotionBox = (
    {
        children ="",
        className = "",
        variant = "fadeUp",
                       ...props
    }) => {
    const variants = {
        fadeUp: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        }
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            variants={variants[variant]}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default MotionBox;