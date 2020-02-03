import TokenBlackList from "../models/Token";

export default async () => {
    const tokenBlackList = await TokenBlackList.find()
    if (tokenBlackList.length >= 1) {
        console.log("Token Black List collection already exists")
        console.log(tokenBlackList);

        return;
    } else {
        const tokenBlackList = new TokenBlackList({
            token: "default"
        });

        const savedTokenBL = await tokenBlackList.save();

        if (savedTokenBL) {
            console.log({ "Collection created: ": savedTokenBL });
        } else {
            console.log({ message: "Something went wrong" })
        }
    }
}