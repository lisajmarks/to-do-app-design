import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable, Alert } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
} from "firebase/auth";
import styles from "./styles";

const Profile = (props) => {
  const [nameEdit, setNameEdit] = useState(false);
  const [numberEdit, setNumberEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [data, updateData] = useState({ name: "" });
  const [profiledata, setProfileData] = useState({
    name: "",
    number: "",
    email: "",
  });

  const db = getDatabase();
  const profileRef = ref(db, "profiles/" + props.userId);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleNameEdit = (name) => {
    if (nameEdit) {
      if (name !== "") {
        updateData(name);
        setNameEdit(!nameEdit);
      }
    } else {
      setName(name);
      setNameEdit(!nameEdit);
    }
  };

  const handleNumberEdit = (number) => {
    if (numberEdit) {
      if (number !== "") {
        updateData(number);
        setNumberEdit(!numberEdit);
      }
    } else {
      setNumber(number);
      setNumberEdit(!numberEdit);
    }
  };

  const handleEmailEdit = (email) => {
    if (emailEdit) {
      if (email !== "") {
        updateData(email);
        setEmailEdit(!emailEdit);
      }
    } else {
      setEmail(email);
      setEmailEdit(!emailEdit);
    }
  };

  useEffect(() => {
    onValue(profileRef, (snapshot) => {
      if (snapshot.val() !== null) {
        setProfileData(snapshot.val());
      } else {
        setProfileData({ email: "", name: "", number: "" });
      }
    });
  }, []);

  useEffect(() => {
    if (props.userId === "") {
      props.navigation.navigate("Auth");
    } else {
      console.log("profiles/" + props.userId);
    }
  }, [props.userId]);

  const onSubmitName = () => {
    set(profileRef, {
      name: profiledata.name,
      email: profiledata.email,
      number: profiledata.number,
    }).catch((err) => console.log(err));
  };

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

  const onSubmitNumber = () => {
    set(profileRef, {
      name: profiledata.name,
      email: profiledata.email,
      number: profiledata.number,
    }).catch((err) => console.log(err));
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

  return (
    <View style={styles.container}>
      <Text>MY INFORMATION</Text>
      {nameEdit ? (
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(str) => onChangeText(str, "name")}
          onBlur={() => onSubmitName()}
          value={name}
        />
      ) : (
        <Pressable onPress={() => handleNameEdit()}>
          <Text>{profiledata.name ? profiledata.name : "No name saved"}</Text>
        </Pressable>
      )}

      {numberEdit ? (
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          onChangeText={(str) => onChangeText(str, "number")}
          value={number}
          onBlur={() => onSubmitNumber()}
          keyboardType="numeric"
        />
      ) : (
        <Pressable onPress={() => handleNumberEdit()}>
          <Text>
            {profiledata.number ? profiledata.number : "No phone number"}
          </Text>
        </Pressable>
      )}

      {emailEdit ? (
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(str) => onChangeText(str, "email")}
          value={email}
          onBlur={() => onSubmitEmail()}
        />
      ) : (
        <Pressable onPress={() => handleEmailEdit()}>
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
