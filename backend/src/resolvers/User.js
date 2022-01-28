const User = {
    public_trips(parent, args, { db }, info) {
        return parent.public_trips;
    },
    private_trips(parent, args, { db }, info) {
        return parent.private_trips;
    }
}

export default User;