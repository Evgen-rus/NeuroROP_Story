import { motion, useScroll, useSpring } from 'motion/react'

export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 })

  return (
    <motion.div
      className="progress"
      style={{ scaleX: progress }}
      aria-hidden="true"
    />
  )
}
