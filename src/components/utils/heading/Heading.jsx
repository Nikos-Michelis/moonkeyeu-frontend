import { motion } from "framer-motion";

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

function Heading({ title, description }) {
    return (
        <section className="heading-section">
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container heading" data-type="full-bleed">
                    <h1 className="heading__title">{title}</h1>
                    <p className="heading__text">{description}</p>
                </div>
            </motion.div>
        </section>
    );
}

export default Heading;
