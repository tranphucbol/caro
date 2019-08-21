class UserDTO {
    constructor(user) {
        this.username = user.username;
        this.winningCount = user.winningCount;
        this.gameCount = user.gameCount;
        this.ratioWinning = `${user.gameCount === 0 ? 0 : (user.winningCount / user.gameCount).toFixed(2) * 100}%`;
        this.avatar = user.avatar;
        this.point = user.point;
        this.rank = 0;
    }
}

module.exports = UserDTO