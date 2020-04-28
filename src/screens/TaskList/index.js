import React, { Component } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  FlatList, 
  TouchableOpacity,  
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyle from '../../commonStyles';
import todayImage from '../../assets/imgs/today.jpg';
import Task from '../../components/Task';
import AddTask from '../AddTask';
import commonStyles from '../../commonStyles';

import styles from 'styles';

const initialState = {
  showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
};

export default class TaskList extends Component {
  state = {
    ...initialState
  }

  componentDidMount = async() => {
    const stateString = await AsyncStorage.getItem('tasksState');
    const state = JSON.parse(stateString) || initialState;
    this.setState(state, this.filterTasks);
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks },this.filterTasks);
  }

  filterTasks = () => {
    let visibleTasks = null;
    if(this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }

    this.setState({ visibleTasks });
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state));
  }

  toggleTask = taskId => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if(task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date()
      }
    });

    this.setState({ tasks }, this.filterTasks);
  }

  addTask = newTask => {
    if(!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada');
      return;
    }

    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    });

    this.setState({ tasks, showAddTask: false }, this.filterTasks)
  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({ tasks }, this.filterTasks)
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
    return (
      <View style={styles.container}>
        <AddTask 
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({ showAddTask: false })}
          onSave={this.addTask}
        />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                size={20} color={commonStyle.colors.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => 
              <Task {...item} 
                onDelete={this.deleteTask}
                onToggleTask={this.toggleTask}
              />
            }
          />
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => this.setState({showAddTask: true})}
          activeOpacity={0.7}>
          <Icon name="plus" size={24} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    );
  }
}