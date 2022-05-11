import AWS from "../config/aws.config";
import { AttributeListType, ListUsersResponse, UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
import util from "util";

export class CognitoService {
    async listUsers() {
        try {
            let identities = await cognitoidentityserviceprovider.listUsers({
                UserPoolId: <string>process.env.AWS_COGNITO_POOL_ID,
                // AttributesToGet: ["email", "phone_number", "name"],
                // Filter: "email_verified=true",
                // Limit: 60,
            })
                .promise()
                .then((result: ListUsersResponse) => {
                    // console.log(util.inspect(result, { depth: 10 }));
                    return result;
                });

            return identities.Users!.map((user: UserType) => {
                return {
                    username: user.Username,
                    name: this.reduceUserAttributes(user.Attributes!, "custom:name"),
                    email: this.reduceUserAttributes(user.Attributes!, "email"),
                    phone: this.reduceUserAttributes(user.Attributes!, "custom:extension"),
                    role: this.reduceUserAttributes(user.Attributes!, "custom:role"),
                };
            });
        } catch (error) {
            console.log("Error: ", error);
            return null;
        }

    }

    async listUsersInGroup(groupName: string) {
        try {
            let identities = await cognitoidentityserviceprovider.listUsersInGroup({
                UserPoolId: process.env.AWS_COGNITO_POOL_ID as string,
                GroupName: groupName,

            })
                .promise()
                .then((result: ListUsersResponse) => {
                    console.log("carRentalGroup Users->>>", util.inspect(result, { depth: 10 }));
                    return result;
                });

            return identities.Users!.map((user: UserType) => {
                return {
                    username: user.Username,
                    name: this.reduceUserAttributes(user.Attributes!, "custom:name"),
                    email: this.reduceUserAttributes(user.Attributes!, "email"),
                    phone: this.reduceUserAttributes(user.Attributes!, "custom:phone_number"),
                    kraPin: this.reduceUserAttributes(user.Attributes!, "custom:kraPin"),
                    physicalAddress: this.reduceUserAttributes(user.Attributes!, "custom:physical_address"),
                    bankName: this.reduceUserAttributes(user.Attributes!, "custom:bank_name"),
                    bankAccountNumber: this.reduceUserAttributes(user.Attributes!, "custom:bank_account"),
                    bankBranch: this.reduceUserAttributes(user.Attributes!, "custom:bank_branch"),
                    role: this.reduceUserAttributes(user.Attributes!, "custom:role"),
                };
            });
        } catch (error) {

            console.log(`listUsersInGroup*Error: ${process.env.AWS_REGION}`, error);
            return null;
        }
    }

    async getUser(username: string) {
        try {
            const user = await cognitoidentityserviceprovider.adminGetUser({
                UserPoolId: process.env.AWS_COGNITO_POOL_ID as string,
                Username: username,
            }).promise().then(result => result);
            console.log("CognitoGetUser->>>", util.inspect(user, { depth: 10 }));
            // return user;
            return {
                username: user.Username,
                name: this.reduceUserAttributes(user.UserAttributes!, "custom:name"),
                email: this.reduceUserAttributes(user.UserAttributes!, "email"),
                phone: this.reduceUserAttributes(user.UserAttributes!, "custom:phone_number"),
                kraPin: this.reduceUserAttributes(user.UserAttributes!, "custom:kraPin"),
                physicalAddress: this.reduceUserAttributes(user.UserAttributes!, "custom:physical_address"),
                bankName: this.reduceUserAttributes(user.UserAttributes!, "custom:bank_name"),
                bankAccountNumber: this.reduceUserAttributes(user.UserAttributes!, "custom:bank_account"),
                bankBranch: this.reduceUserAttributes(user.UserAttributes!, "custom:bank_branch"),
                role: this.reduceUserAttributes(user.UserAttributes!, "custom:role"),
            };
        } catch (error) {

        }
    }



    private reduceUserAttributes(userAttributes: AttributeListType, field: string): string {

        return userAttributes.reduce((acc, curr) => {
            if (curr.Name === field) {
                acc = curr.Value!;
            }
            return acc;

        }, "");
    }


}