import { useEffect, useState } from "react";
import { requestData } from "../../axios";

export function ProfilePage() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    requestData.post("/get-profile").then((res, err) => {
      const dataRespond = res.data;

      setProfile(dataRespond?.profile);
      console.log(dataRespond?.profile);
    });
  }, []);

  return (
    <>
      {profile.map((value, index) => (
        <div>
          <div>Username: {value.username}</div>
          <div>name: {value.name}</div>
        </div>
      ))}
    </>
  );
}
