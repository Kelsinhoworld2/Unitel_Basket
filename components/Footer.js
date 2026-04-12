import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      className="mt-16 border-t border-white/10 bg-[#05070a] py-8 text-center"
    >
      <p className="text-sm text-white/70">
        Desenvolvido por{' '}
        <motion.a
          href="https://www.instagram.com/kelson_varela/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="font-black text-[#FF6B00] transition-colors hover:text-orange-400"
        >
          Kelson Varela
        </motion.a>
      </p>
      <p className="mt-2 text-xs text-white/50">Unitel Basket © 2025/2026</p>
    </motion.footer>
  );
}
