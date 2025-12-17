import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { styles } from '../assets/styles/home.style'
import { COLORS } from '../constants/colors'
import { useState } from 'react'
import CustomAlert from './CustomAlert'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const [alertVisible, setAlertVisible] = useState(false)

  const handleSignOut = async () => {
    setAlertVisible(true)
  }
  return (
    <>
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.text} />
      </TouchableOpacity>
      <CustomAlert
        visible={alertVisible}
        title="Sign Out"
        message="Hey, are you leaving us alone?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => {
            setAlertVisible(false);
            signOut();
        }}
        onCancel={() => setAlertVisible(false)}
      />
    </>
  )
}