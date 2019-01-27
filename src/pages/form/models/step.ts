import { Model} from 'dva';
import { delay } from 'dva/saga';
import { message } from 'antd';

export interface IRegisteredForm {
  username: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  dateBirth: any;
  nickname?: string;
  email?: string;
}

export interface IAddressForm {
  consignee: string;
  area: string;
  detailAddress: string;
  consigneeMobile: string;
  addressAlias?: string
}

export interface IStepState {
  currentStep: number;
  registeredForm: IRegisteredForm;
  addressForm: IAddressForm;
}

const finishSubmitForm = async (time: number) => {
  await delay(time);
};

const step: Model = {
  namespace: 'step',

  state: {
    currentStep: 0,
    registeredForm: {},
    addressForm: {},
  },

  effects: {
    *submitRegisteredForm({ payload }, { call, put }) {
      yield call(finishSubmitForm, 800);
      yield put({
        type: 'saveStep1',
        payload
      });
      message.success('注册成功');
    },

    *submitAddressForm({ payload }, { call, put }) {
      yield call(finishSubmitForm, 600);
      yield put({
        type: 'saveStep2',
        payload
      });
      message.success('注册成功');
    },
  },

  reducers: {
    saveStep1(state, { payload }) {
      return {
        ...state,
        currentStep: 1,
        registeredForm: {
          ...state.registeredForm,
          ...payload,
        },
      };
    },

    saveStep2(state, { payload }) {
      return {
        ...state,
        currentStep: 2,
        addressForm: {
          ...state.addressForm,
          ...payload,
        },
      };
    },
  },
};

export default step;
