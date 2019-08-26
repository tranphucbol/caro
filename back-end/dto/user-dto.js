class UserDTO {
    constructor(user) {
        this.username = user.username;
        this.winningCount = user.winningCount;
        this.gameCount = user.gameCount;
        this.ratioWinning = `${user.gameCount === 0 ? 0 : ((user.winningCount / user.gameCount) * 100).toFixed(1)}%`;
        this.avatar = user.avatar;
        this.point = user.point;
        this.rank = user.rank;
    }
}

module.exports = UserDTO