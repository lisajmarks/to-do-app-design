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
    console.log("profiledata object", profiledata);

    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      setProfileData({ ...profiledata, number: data.number });
    });
  }, []);

  useEffect(() => {
    if (props.userId === "") {
      props.navigation.navigate("Auth");
    } else {
      console.log("profiles/" + props.userId);
    }
  }, [props.userId]);

  const onSubmitEmail = () => {
    const credential = EmailAuthProvider.credential(
      user.providerData[0].email,
      currentPassword
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmail(user, profiledata.email).then(() =>
          console.log("success number 2")
        );
      })
      .catch((err) => console.log("Nooooooooooo", err));
  };

  const saveNumberToFirebase = () => {
    set(profileRef, {
      number: profiledata.number,
      score: profiledata.currentScore,
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

  const verifyThenUpdate = (text) => {
    if (text === newPassword) {
      // TODO: Set up password field to take current password before updating
      const credential = EmailAuthProvider.credential(
        user.providerData[0].email,
        currentPassword
      );

      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword)
            .then(() => {
              console.log("success");
            })
            .catch((error) => {
              console.log("nope ===>", error);
            });
        })
        .catch((err) => console.log(err));
    } else {
      console.log("some error occurred");
    }
  };

  const [emailModal, setEmailModal] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={emailModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setEmailModal(!emailModal);
        }}
      >
        <View>
          <View>
            <Text>Hello World!</Text>
            <Pressable onPress={() => console.log("yoo")}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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

      {emailEdit ? (
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(str) => onChangeText(str, "email")}
          value={profiledata.email}
          onBlur={() => onSubmitEmail()}
        />
      ) : (
        <Pressable onPress={() => setEmailEdit(!emailEdit)}>
          <Text>
            {profiledata.email ? profiledata.email : "No email saved"}
          </Text>
        </Pressable>
      )}

      <Text>CHANGE PASSWORD</Text>
      <TextInput
        placeholder="Current Password"
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        placeholder="New Password"
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        onBlur={(obj) =>
          newPassword.length > 0 && verifyThenUpdate(obj.target.value)
        }
      />
    </View>
  );
};

export default Profile;
