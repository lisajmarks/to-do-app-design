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
} from "firebase/auth";

const EmailModal = ({
  emailModal,
  setEmailModal,
  profiledata,
  onChangeText,
  setProfileData,
}) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const auth = getAuth();
  const user = auth.currentUser;

  const submitNewEmail = () => {
    const credential = EmailAuthProvider.credential(
      user.providerData[0].email,
      form.password
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmail(user, form.email).then(() => {
          console.log("successfully saved a new email");
          setProfileData({ ...profiledata, email: form.email });
          setEmailModal(false);
        });
      })
      .catch((err) => console.log("Nooooooooooo", err));
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={emailModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View>
        <View>
          <Text>Changing Email</Text>
          <TextInput
            placeholder="Enter new email"
            style={styles.input}
            onChangeText={(input) => setForm({ ...form, email: input })}
          />
          <TextInput
            placeholder="Enter password"
            style={styles.input}
            onChangeText={(input) => setForm({ ...form, password: input })}
          />

          <Button onPress={() => submitNewEmail()} title="Update Email" />
          <Button onPress={() => setEmailModal(!emailModal)} title="Cancel" />
        </View>
      </View>
    </Modal>
  );
};

export default EmailModal;

const styles = StyleSheet.create({});
