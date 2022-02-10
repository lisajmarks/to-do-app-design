import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Button,
} from "react-native";

import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const PassModal = ({
  setPasswordModal,
  passwordModal,
  profiledata,
  setProfileData,
}) => {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });

  const auth = getAuth();
  const user = auth.currentUser;

  const submitNewPassword = () => {
    const credential = EmailAuthProvider.credential(
      user.providerData[0].email,
      form.oldPassword
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, form.newPassword)
          .then(() => {
            console.log("successfully updated password");
            setPasswordModal(false);
          })
          .catch((error) => {
            console.log("nope ===>", error);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={passwordModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View>
        <View>
          <Text>Changing Password</Text>
          <TextInput
            placeholder="Old Password"
            onChangeText={(input) => setForm({ ...form, oldPassword: input })}
          />
          <TextInput
            placeholder="New Password"
            onChangeText={(input) => setForm({ ...form, newPassword: input })}
          />

          <Button onPress={() => submitNewPassword()} title="Update Password" />
          <Button
            onPress={() => setPasswordModal(!passwordModal)}
            title="Cancel"
          />
        </View>
      </View>
    </Modal>
  );
};

export default PassModal;

const styles = StyleSheet.create({});
