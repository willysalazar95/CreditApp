import { View, Text,StyleSheet,TextInput,inputStyle,Button,Image ,useWindowDimensions, ScrollView} from 'react-native'
import React ,{useState} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import Logo from '../Imagenes/LogoReact.jpg'
import Icono from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import bd from 'react-native-sqlite-storage';
 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
//import HomeScreen from './Home';
/*import RNFetchBlob from 'rn-fetch-blob';
const dirs = RNFetchBlob.fs.dirs;
// for internal storage
console.log(dirs.MainBundleDir + '/databases');
// for external storage
console.log(dirs.SDCardApplicationDir + '/databases');
// show database list
RNFetchBlob.fs.ls(dirs.MainBundleDir + '/databases').then((files) => {
    console.log(files)
});
*/
const Stack = createNativeStackNavigator();


const db=bd.openDatabase({
  location:'default',
  name:'db02.db',
 // createFromLocation:'~dbSistema01.db' 
  //createFromLocation:'~www/dbPlayer5.db' 
},()=>{
  console.log('Home - ok ')
},()=>{
  console.log('Home - error')
})

const styles = StyleSheet.create({
  formContainer: {
    alignItems:'center',
    padding: 50 ,
  },
});

const stylo=StyleSheet.create({
  root:{alignItems:'center',
  padding:20,},
  logo:{width:'50%',maxWidth:400,maxHeight:100,},
  contenedor2:{backgroundColor:'red',width:'100%',borderColor:'white',borderRadius:1,borderWidth:1,},  
  estiloContenedorTextInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
},
estiloIcono: {
  padding: 10,alignItems: 'center',
},
estiloTextInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
}, 
   },)
   
const icoUsuario = <Icono name="user" size={20} color="#ffab07" solid style={stylo.estiloIcono}  />; // Defaults to regular
const icoClave = <Icono name="lock" size={20} color="lime" solid style={stylo.estiloIcono}  />; // Defaults to regular


const FrmLogin = ({navigation}) => {
      const {height}=useWindowDimensions();
      const [hidePass, setHidePass] = useState(true); 

      var [searchResult, setSearchResult] = useState(false);

      existeUsuario=(_Usuario)=>{         
        setSearchResult(false);
        console.log(_Usuario);
        db.transaction((tx) => {tx.executeSql(
          "SELECT 1 FROM USUARIOS WHERE USUARIO=?",
          [_Usuario], 
          (tx, results) => {{
            var len = results.rows.length;  
            console.log(len);
            if (len == 0) {  
              console.log('Usuario no existe');
              setSearchResult(false);
            }   
            else{console.log('Usuario si existe');
            setSearchResult(true);
            } 
          }
          })})
      
      
      }
     
     // error=>{console.log(error)}
      
      

      <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'SISTEMA DE PRESTAMOS - SISPRE' }}
                />              
              </Stack.Navigator>
      </NavigationContainer>

          const HomeScreen = () => {
            return (              
                  navigation.navigate('Home')                
            );
          };
          

      return (
        <Formik
            initialValues={{ usuario: '',clave: ''}}
            onSubmit={(values) =>{ 
              console.log('Buscando Usuario');   
              existeUsuario(values.usuario); 
              console.log(searchResult); 
              if(searchResult==true)     
                {HomeScreen();}
              else         
                { 
                if(values.usuario==="a"&&values.clave==="a")
                {searchResult=true;HomeScreen();}
                else{alert('[Usuario / Clave]  incorrecta')}
                }
            } 
            }
            validationSchema={yup.object().shape({
              usuario: yup.string().required('Ingrese su usuario, por favor!'),          
              clave: yup.string().min(1).max(10, 'La clave no debe exceder a 10 caracteres').required('Ingrese su clave por favor!'),
            })}
          >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
           <KeyboardAwareScrollView>
           
           <View style={styles.formContainer}>
                <Image source={Logo} style={stylo.logo,{height:height*.3},{borderRadius:100}} resizeMode='contain'/>
              <View style={stylo.estiloContenedorTextInput}>
                  {icoUsuario}  
                    <TextInput
                    
                      value={values.usuario}
                      style={stylo.estiloTextInput}
                      onChangeText={handleChange('usuario')}
                      onBlur={() => setFieldTouched('usuario')}
                      placeholder="Usuario"
                    />
                    {touched.usuario && errors.usuario &&
                      <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.usuario}</Text>
                    }   
                </View>                
                <View style={stylo.estiloContenedorTextInput} >        
                    {icoClave}  
                    <TextInput 
                      value={values.clave}
                      style={stylo.estiloTextInput}
                      onChangeText={handleChange('clave')}
                      placeholder="Clave"
                      onBlur={() => setFieldTouched('clave')}
                      secureTextEntry={hidePass ? true : false}
                    />
                      <Icono
                      name={hidePass ? 'eye-slash' : 'eye'}
                      size={15}
                      color="grey"
                      onPress={() => setHidePass(!hidePass)}
                    /> 
                    {touched.clave && errors.clave &&
                      <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.clave}</Text>
                    }
                </View>
                <View  style={{flexDirection:'row'}} >
                    <Button 
                      color="#3740FE"
                      title='Ingresar'
                      style={{width:'50%'}}
                      onPress={handleSubmit}
                    />
                    <Button 
                      color="gray"
                      title='Reset'
                      style={{width:'50%'}}
                      
                    />
                </View>
                <View>
                    <Text>Informes Cel: (+51) 982 177 749 - PERÚ</Text>

                </View>
                 
              </View>
              </KeyboardAwareScrollView>
            )}
          </Formik>
      )
}
export default FrmLogin
