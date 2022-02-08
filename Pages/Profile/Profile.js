import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable, Alert, Modal } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import styles from "./styles";
import EmailModal from "../../constants/EmailModal";
import PassModal from "../../constants/PassModal";

const Profile = (props) => {
  const [nameEdit, setNameEdit] = useState(false);
  const [numberEdit, setNumberEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  const [profiledata, setProfileData] = useState({
    name: user.providerData[0].displayName,
    number: user.providerData[0].phoneNumber,
    email: user.providerData[0].email,
    currentScore: 0,
  });

  const db = getDatabase();
  const profileRef = ref(db, "profiles/" + props.userId);

  const handleNumberEdit = (number) => {
    if (numberEdit) {
      if (number !== "") {
        setNumberEdit(!numberEdit);
      }
    } else {
      setNumber(number);
      setNumberEdit(!numberEdit);
    }
  };

  useEffect(() => {
    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      setProfileData({
        ...profiledata,
        number: data !== null ? data.number : "",
      });
    });
  }, []);

  useEffect(() => {
    if (props.userId === "") {
      props.navigation.navigate("Auth");
    } else {
      console.log("profiles/" + props.userId);
    }
  }, [props.userId]);

  const saveNumberToFirebase = () => {
    set(profileRef, {
      number: profiledata.number,
      currentScore: profiledata.currentScore,
      name: user.providerData[0].displayName,
    }).catch((err) => console.log(err));
  };

  const onSubmit = () => {
    updateProfile(user, {
      displayName: profiledata.name,
    })
      .then(() => {
        console.log("successfully saved");
        console.log(user.providerData[0]);
      })
      .catch((error) => {
        console.log("error ==>", error);
      });
  };

  const onChangeText = (text, field) => {
    setProfileData({ ...profiledata, [field]: text });
  };

  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  return (
    <View style={styles.container}>
      <EmailModal
        setEmailModal={setEmailModal}
        emailModal={emailModal}
        profiledata={profiledata}
        setProfileData={setProfileData}
      />

      <PassModal
        setPasswordModal={setPasswordModal}
        passwordModal={passwordModal}
        profiledata={profiledata}
        setProfileData={setProfileData}
      />

      <Text>MY INFORMATION</Text>
      {nameEdit ? (
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(str) => onChangeText(str, "name")}
          onBlur={() => onSubmit()}
          value={profiledata.name === null ? "" : profiledata.name}
        />
      ) : (
        <Pressable onPress={() => setNameEdit(!nameEdit)}>
          <Text>{profiledata.name ? profiledata.name : "Name"}</Text>
        </Pressable>
      )}

      {numberEdit ? (
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          onChangeText={(str) => onChangeText(str, "number")}
          value={profiledata.number === null ? "" : profiledata.number}
          onBlur={() => saveNumberToFirebase()}
          keyboardType="numeric"
        />
      ) : (
        <Pressable onPress={() => setNumberEdit(!numberEdit)}>
          <Text>{profiledata.number ? profiledata.number : "Phone"}</Text>
        </Pressable>
      )}

      <Pressable onPress={() => setEmailModal(!emailModal)}>
        <Text>{profiledata.email ? profiledata.email : "No email saved"}</Text>
      </Pressable>

      <Pressable onPress={() => setPasswordModal(!passwordModal)}>
        <Text>CHANGE PASSWORD</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
