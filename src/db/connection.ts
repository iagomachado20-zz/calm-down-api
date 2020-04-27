import mongoose from 'mongoose';

class ConnectionDB {

    private connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

    public connect() {

        mongoose.connect(this.connectionString);

    }   

}

export default ConnectionDB;