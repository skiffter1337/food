import newOrder from '../../audio/icq.mp3'

export const playNewOrderSound = () => {
    const notificationSound = new Audio(newOrder);
    notificationSound.play();
}