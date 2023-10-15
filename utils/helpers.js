var moment = require('moment');

module.exports = {
    formatDate: (value) => {
        return moment(value).format('M/D/YYYY');
    }
}
