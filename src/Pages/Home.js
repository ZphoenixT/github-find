import React from 'react'
import Search from '../Components/Search'
import { motion } from 'framer-motion';

function Home() {
  return (
    <motion.section
    className='container'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className='center'>
    <Search/>
    </div>
    </motion.section>
  )
}

export default Home