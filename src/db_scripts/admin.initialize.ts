const Admin = require("../models/Admin");
import adminData from "../../config/admin.json";
const bcrypt = require("bcryptjs");

export default async () => {
    const admin = await Admin.find()
    if (admin.length >= 1) {
        console.log("Admin already exists")
        console.log(admin);

        return;
    } else {
        const admin = new Admin({
            name: adminData.name,
            password: adminData.password,
            email: adminData.email
        });

        bcrypt.genSalt(10, (err: Error, salt: any) => {
            bcrypt.hash(admin.password, salt, (err: Error, hash: any) => {
                if (err) throw err;
                admin.password = hash;
                admin.save()
            })
        })
    }
}