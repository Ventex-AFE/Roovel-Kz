import soli from './InfoSolicitud.module.css';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



const InfoSolicitud = ({ idCurrentUserSenn }) => {
    console.log('idCurrentUserSenn -------', idCurrentUserSenn);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [actualImage, setActualImage] = useState(0);
    const [infoIsOpen, setInfoIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [customDirection, setCustomDirection] = useState(null);
    const [swipeDirection, setSwipeDirection] = useState(null);
    const swipeDirectionRef = useRef(null);


    const [PROFILES, setProfiles] = useState([]);
    const userCard = PROFILES;

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/solicitud?user=${idCurrentUserSenn}`);
                const data = await response.json();

                if (data && typeof data === 'object') {
                    setProfiles(data); 
                } else {
                    console.error('La respuesta no es un objeto válido:', data);
                }
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchProfiles();
    }, [idCurrentUserSenn]);

    console.log('userCard -------', userCard);

    function back() {
        if (actualImage > 0) setActualImage(actualImage - 1);
    }

    function next() {
        if (userCard?.images && actualImage < userCard.images.length - 1) {
            setActualImage(actualImage + 1);
        }
    }
    function nextUserCard() {
    }

    if (!userCard || !userCard.images) return <p>Cargando perfiles...</p>;

    return (
        <article className={soli.matchRoommateContainer}>
            <section className={soli.matchCardContainer}>
                <div className={soli.cardContainerWrapper}>
                    {nextUserCard && (
                        <div className={soli.cardContainer}>
                            <MatchCard
                                userCard={nextUserCard}
                                actualImage={actualImage}
                                back={back}
                                next={next}
                                setInfoIsOpen={setInfoIsOpen}
                            />
                            <ProfileCardInfo
                                userCard={nextUserCard}
                                infoIsOpen={infoIsOpen}
                                setInfoIsOpen={setInfoIsOpen}
                            />
                        </div>
                    )}

                    <AnimatePresence>
                        {isVisible && userCard && (
                            <motion.div
                                key={`${userCard?.id || currentIndex}-${swipeDirection || 'none'}`}
                                className="cardContainer animatedCard"
                                initial={false}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{
                                    x: swipeDirection === 'right' ? 300 : -300,
                                    rotate: swipeDirection === 'right' ? 20 : -20,
                                    opacity: 0,
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <MatchCard
                                    userCard={userCard}
                                    actualImage={actualImage}
                                    back={back}
                                    next={next}
                                    setInfoIsOpen={setInfoIsOpen}
                                />
                                <ProfileCardInfo
                                    userCard={userCard}
                                    infoIsOpen={infoIsOpen}
                                    setInfoIsOpen={setInfoIsOpen}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </article>
    );
};

const MatchCard = ({ back, next, userCard, actualImage, setInfoIsOpen, onLike, onDislike }) => {
    const [isHover, setIsHover] = useState(false);

    if (!userCard || !userCard.images || userCard.images.length === 0) {
        return <p>No hay imágenes disponibles.</p>;
    }

    return (
        <section
            className={soli.matchCard} 
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img
                src={`http://localhost:3000/${userCard.images[actualImage]}`}
                alt=""
                className={soli.matchCardProfileImage}
                draggable="false"
            />

            <ActiveThumbnail images={userCard.images} actualImage={actualImage} />

            {actualImage > 0 && (
                <button
                    className={soli.imageButton}
                    style={{ left: '2vh', opacity: isHover ? 1 : 0 }}
                    onClick={back}
                >
                    <img src="/Graphics/Icons/arrow_back.png" alt="" style={{ width: '100%' }} />
                </button>
            )}
            {actualImage < userCard.images.length - 1 && (
                <button
                    className={soli.imageButton}
                    style={{ right: '2vh', opacity: isHover ? 1 : 0 }}
                    onClick={next}
                >
                    <img src="/Graphics/Icons/arrow_forward.png" alt="" style={{ width: '100%' }} />
                </button>
            )}

            {/* <MatchActionss
                setInfoIsOpen={setInfoIsOpen}
                userCard={userCard}
                onLike={onLike}
                onDislike={onDislike}
            /> */}
        </section>
    );
};

const ActiveThumbnail = ({ images, actualImage }) => (
    <>
        {images.length > 1 && (
            <div className={soli.activeThumbnailContainer}>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`thumbnail ${actualImage === index ? 'activeThumbnail' : ''}`}
                    />
                ))}
            </div>
        )}
    </>
);

const MatchActions = ({ setInfoIsOpen, userCard, onLike, onDislike }) => {
    const age = useMemo(() => calculateAge(userCard?.birthday), [userCard?.birthday]);

    return (
        <section className={soli.matchActions}>
            <div className={soli.firstInfoContainer}>
                <div className={soli.ageAndNameInfoCardContainer}>
                    <p className={soli.profileNameMatchCard}>{userCard?.name}</p>
                    <p className={soli.profileAgeMatchCard}>{age}</p>
                </div>
                <p className={soli.profileLocationMatchCard}>{userCard?.location}</p>
            </div>
            <div className={soli.actionButtonsContainer}>
                <button className={soli.smallInteractWithMatchCard} onClick={() => setInfoIsOpen(false)}>-</button>
                <button className={soli.interactWithMatchCard} onClick={onDislike}>
                    <img src="/Graphics/Icons/dislike.png" alt="" draggable="false" style={{ width: '50%' }} />
                </button>
                <button className={soli.interactWithMatchCard} onClick={onLike}>
                    <img src="/Graphics/Icons/like.png" alt="" draggable="false" style={{ width: '50%' }} />
                </button>
                <button className={soli.smallInteractWithMatchCard} onClick={() => setInfoIsOpen(true)}>+</button>
            </div>
        </section>
    );
};

const ProfileCardInfo = ({ userCard, infoIsOpen, setInfoIsOpen }) => {
    const age = useMemo(() => calculateAge(userCard?.birthday), [userCard?.birthday]);

    return (
        <section style={{ width: infoIsOpen ? '55vh' : 0 }} className={soli.profileCardInfoContainer}>
            <section className={soli.profileCardInfo}>
                <button className={soli.closeInfoCard} onClick={() => setInfoIsOpen(false)}>
                    <img src="/Graphics/Icons/close_dark.png" alt="" draggable="false" style={{ width: '100%' }} />
                </button>

                <div className={soli.firstInfoInInfoCardContainer}>
                    <div className={soli.ageAndNameContainer}>
                        <p className={soli.profileNameMatchCard} style={{ color: '#4A617F' }}>{userCard?.name}</p>
                        <p className={soli.profileAgeMatchCard} style={{ color: '#878787' }}>{age}</p>
                    </div>
                    <p className={soli.profileLocationMatchCard} style={{ color: '#878787' }}>{userCard?.location}</p>
                </div>

                <div className={soli.tagsContainer}>
                    {userCard?.tags?.map((tag, index) => (
                        <p key={index} className={soli.tagProfileCard}>{tag}</p>
                    ))}
                </div>

                <div className={soli.lookingForContainer}>
                </div>
            </section>
        </section>
    );
};

const calculateAge = (birthdate) => {
    if (!birthdate) return '-';
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export default InfoSolicitud;

