const initUser = () => {
    return {
        username: 'Phuc dep trai',
        avatar: `${process.env.PUBLIC_URL}/images/shocked.svg`,
        rank: 100,
        ratioWinning: '50%',
        point: 100000
    }
}

const user = (state = initUser(), action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default user