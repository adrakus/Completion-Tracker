import { useContext, useEffect } from 'react';
import { putUser } from '../api/apiUser';
import { CancelToken } from 'apisauce';
import { AppContext } from '../context/AppContext';

export default function useEditProfile(profileData, setProfileData){
    const {user, setUser} = useContext(AppContext);

    useEffect(
        () => {
            const source = CancelToken.source();

            const editProfile = async () => {
                const response_object = await putUser(profileData, user.token, source.token);
                if (response_object){
                    console.log('profile has been edited');
                    user.first_name = profileData.first_name;
                    user.last_name = profileData.last_name;
                    user.email = profileData.email;
                    setUser(user);
                    setProfileData({});
                };
            };

            if(profileData?.password){
                editProfile();
            };

            return () => {
                source.cancel();
            };
        },
        [profileData, setProfileData, user, setUser]
    );
};
