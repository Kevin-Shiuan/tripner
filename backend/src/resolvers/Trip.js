const Trip = {
    tripmate(parent, args, { db }, info) {
        return parent.tripmate;
    },
    async unscheduled_locations(parent, args, { db }, info) {
        return parent.unscheduled_locations;

    },
    async scheduled_locations(parent, args, { db }, info) {
        return parent.scheduled_locations;
    }
}

export default Trip;