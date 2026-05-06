import { motion } from 'framer-motion'

export function FadeIn(props: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: props.delay ?? 0 }}
    >
      {props.children}
    </motion.div>
  )
}

