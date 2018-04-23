export const userQueries = {
    // get all users
    allUsersQuery: () => ({
        url: '//localhost:3000/users',
        update: {
            users: (prev, next) => next,
        },
    }),
    getUserQuery(user) {
        const config = {
            url: `//localhost:3000/users/${user.id}`,
            force: true,
            queryKey: `getUser${user.id}`,
            update: {
                user: (previousLoadedUser, loadedUser) => {
                    //console.log('user', previousLoadedUser, loadedUser)
                    return loadedUser
                }
            }
        }
        return config;
    },

    createUserQuery(user, optimistic) {
        const config = {
            url: `//localhost:3000/users`,
            body: user,
            update: {
                users: (previousUsers, nextUser) => {
                    return [...previousUsers, ...nextUser]
                },
            },
        };

        /*        if (true) {
                   config.optimisticUpdate = {
                       users: previousUsers => {
                           console.log('OPT', [...previousUsers, .user])
                           return [...previousUsers, user]
                       }
                   };
               } */

        return config;
    },

    updateUserQuery(user, optimistic) {
        const config = {
            url: `//localhost:3000/users/${user.id}`,
            body: user,
            update: {
                users: (previousUsers, nextUsers) => {
                    return [...nextUsers]
                },
            },
            options: {
                method: 'PUT'
            },
        };

        /*        if (true) {
                   config.optimisticUpdate = {
                       users: previousUsers => {
                           console.log('OPT', [...previousUsers, .user])
                           return [...previousUsers, user]
                       }
                   }; 
               } */

        return config;
    },

    deleteUserQuery(user, optimistic) {
        const config = {
            url: `//localhost:3000/users/${user.id}`,
            body: user,
            update: {
                users: (previousUsers, nextUsers) => {
                    return [...nextUsers]
                },
            },
            options: {
                method: 'DELETE'
            },
        };

        /*        if (true) {
                   config.optimisticUpdate = {
                       users: previousUsers => {
                           console.log('OPT', [...previousUsers, .user])
                           return [...previousUsers, user]
                       }
                   };
               } */

        return config;
    },

}