import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Text, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import PageLoader from "../../components/PageLoader"
import {BalanceCard} from '../../components/BalanceCard'
import {TransactionItem} from '../../components/TransactionItem'
import NoTransactionFound from '../../components/NoTransactionFound'
import CustomAlert from '../../components/CustomAlert'
import { Image } from 'react-native'  

import {useTransactions} from "../../hooks/useTransaction"
import { useEffect, useState } from 'react'
import { styles } from '../../assets/styles/home.style'
import IonIcons from '@expo/vector-icons/Ionicons'

export default function Page() {
  const { user } = useUser()
  const router = useRouter()
  const { refresh } = useLocalSearchParams();
  const [refreshing, setRefreshing] =  useState(false);
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: "",
    message: "",
    confirmText: "OK",
    cancelText: "Cancel",
    onConfirm: () => {},
    onCancel: undefined,
  });

  const {transactions, summary, isLoading, loadData, deleteTransaction} = useTransactions(user.id)

  useEffect(
    () => {
      loadData(), refresh
    }, [loadData]
  )

  const hideAlert = () => setAlertConfig(prev => ({ ...prev, visible: false }));

  const handleDelete = (id) => {
    setAlertConfig({
      visible: true,
      title: "Confirm Delete",
      message: "Are you sure you want to delete this transaction?",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        hideAlert();
        const result = await deleteTransaction(id);
        setTimeout(() => {
          if (result.success) {
            setAlertConfig({
              visible: true,
              title: "Success",
              message: "Transaction deleted successfully.",
              confirmText: "OK",
              onConfirm: hideAlert,
            });
          } else {
            setAlertConfig({
              visible: true,
              title: "Error",
              message: "Failed to delete transaction: " + result.error,
              confirmText: "OK",
              onConfirm: hideAlert,
            });
          }
        }, 300);
      },
      onCancel: hideAlert
    });
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  if(isLoading && !refreshing){
    return <PageLoader />
  }

  return (
    <View style={styles.container}>
        <CustomAlert
            visible={alertConfig.visible}
            title={alertConfig.title}
            message={alertConfig.message}
            confirmText={alertConfig.confirmText}
            cancelText={alertConfig.cancelText}
            onConfirm={alertConfig.onConfirm}
            onCancel={alertConfig.onCancel}
        />
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
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </View>
  )
}