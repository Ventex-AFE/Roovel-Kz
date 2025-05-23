import Styles from './FifthStep.module.css';
import { motion } from 'framer-motion';

export default function ThirdStep({ onSubmit }) {
    return (
        <motion.article
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className={Styles['third-step__title']}>Propiedad terminada</h1>
            <button className={Styles['third-step__button']} onClick={ onSubmit }>
                Guardar y Publicar
            </button>
        </motion.article>
    );
};