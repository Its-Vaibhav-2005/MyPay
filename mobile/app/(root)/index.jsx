import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import PageLoader from "../../components/PageLoader"
import {BalanceCard} from '../../components/BalanceCard'
import {TransactionItem} from '../../components/TransactionItem'
import NoTransactionFound from '../../components/NoTransactionFound'
import { Image } from 'react-native'  

import {useTransactions} from "../../hooks/useTransaction"
import { useEffect } from 'react'
import { styles } from '../../assets/styles/home.style'
import IonIcons from '@expo/vector-icons/Ionicons'

export default function Page() {
  const { user } = useUser()
  const router = useRouter()

  const {transactions, summary, isLoading, loadData, deleteTransaction} = useTransactions(user.id)

  useEffect(
    () => {
      loadData()
    }, [loadData]
  )

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id) }
      ]
    )
  }

  if(isLoading){
    return <PageLoader />
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/*Header */}
        <View style={styles.header}>
          {/*Left*/}
          <View style={styles.headerLeft}>
            <Image 
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>{user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>
            </View>
          </View>
          {/*Right*/}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={()=>router.push('/create')}>
              <IonIcons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        {/* Summary */}
        <BalanceCard summary={summary} />
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

      </View>   
      {/* Transactions List */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({item})=>(
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoTransactionFound />}
      />
    </View>
  )
}