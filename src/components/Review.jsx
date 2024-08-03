import { REVIEW } from "../constants"
import xaviour from '../assets/xaviour.jpeg'
import customer1 from '../assets/customer1.jpeg'
import customer2 from '../assets/customer2.jpeg'
import customer3 from '../assets/customer3.jpeg'
import customer4 from '../assets/customer4.jpeg'
import {motion} from 'framer-motion'
import { containerVariants, ItemVariants } from "./Expertise"

const Review = () => {
  return (
    <section className="container mx-auto mb-8 mt-12" id="review">
        <motion.div 
            initial='hidden'
            whileInView='show'
            variants={containerVariants}
            viewport={{once: true}}
            className="flex flex-col"
        >
            <motion.p 
                variants={ItemVariants}
                className="mb-10 px-5 text-3xl font-light leading-normal tracking-tighter lg:mx-40 lg:mt-30 lg:text-[3.5rem]">
                {REVIEW.content}
            </motion.p>
            <motion.div variants={ItemVariants} className="flex items-center justify-center gap-6">
                <img src={xaviour} width={80} height={80} className="rounded-full border" alt="Xaviour" />
                <div className="tracking-tighter">
                    <h6>{REVIEW.name}</h6>
                    <p className="text-sm text-neutral-500">{REVIEW.profession}</p>
                </div>
            </motion.div>
        </motion.div>
        <motion.div 
            initial='hidden'
            whileInView='show'
            variants={ItemVariants}
            viewport={{once: true}}
            className="mt-14 flex flex-col items-center justify-center gap-2 md:flex-row"
        >
            {[customer1, customer2, customer3, customer4].map((customer, i) => (
                <motion.img variants={ItemVariants} key={i} src={customer} className="h-[300px] w-[200px] rounded-br-3xl rounded-tl-3xl object-cover" alt="customer" />
            ))}
        </motion.div>
    </section>
  )
}

export default Review