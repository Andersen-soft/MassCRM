import { IOneContact, IOneContactAttachment } from '../interfaces';
import {
  GET_ACTIVITY_LOG_SUCCESS,
  GET_ATTACHMENT_SUCCESS,
  GET_ONE_CONTACT_SUCCESS
} from '../actions';
import {
  IOneContactActivityLogItem,
  IOneContactAttachmentItem,
  IOneContactData
} from '../interfaces/IOneContactData';

const initialStateOneContact: IOneContact = {
  data: {
    first_name: '',
    last_name: '',
    birthday: '',
    phones: [
      {
        id: 0,
        name: '',
        phone: ''
      }
    ],
    emails: [
      {
        id: 0,
        email: '',
        verification: false
      }
    ],
    origin: [''],
    colleagues: [],
    social_networks: [
      {
        id: 0,
        link: ''
      }
    ],
    sales: [
      {
        id: 10,
        status: '',
        created_at: '',
        link: '',
        project_c1: '',
        source: ''
      }
    ],
    mails: [
      {
        id: 0,
        message: ''
      }
    ],
    note: [
      {
        id: 0,
        message: ''
      }
    ],
    company: {
      id: 10,
      name: ''
    }
  }
};

interface GetOneContactActionType {
  type: typeof GET_ONE_CONTACT_SUCCESS;
  payload: IOneContactData;
}

export const oneContactReducer = (
  state = initialStateOneContact,
  action: GetOneContactActionType
): IOneContact => {
  switch (action.type) {
    case GET_ONE_CONTACT_SUCCESS:
      return {
        data: action.payload
      };
    default:
      return state;
  }
};

const initialStateContactActivityLog = {
  data: [
    {
      date: '',
      description: '',
      user: {
        id: 0,
        name: '',
        surname: ''
      }
    }
  ]
};

interface GetContactActivityLogType {
  type: typeof GET_ACTIVITY_LOG_SUCCESS;
  payload: Array<IOneContactActivityLogItem>;
}

export const oneContactActivityLogReducer = (
  state = initialStateContactActivityLog,
  action: GetContactActivityLogType
) => {
  switch (action.type) {
    case GET_ACTIVITY_LOG_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};

const initialStateOneContactAttachment: IOneContactAttachment = {
  data: [
    {
      companyId: null,
      createdAt: '',
      fileName: '',
      id: undefined,
      updatedAt: '',
      url: '',
      user: {
        roles: {}
      }
    }
  ]
};

interface GetOneContactAttachmentActionType {
  type: typeof GET_ATTACHMENT_SUCCESS;
  payload: Array<IOneContactAttachmentItem>;
}

export const oneContactAttachmentReducer = (
  state = initialStateOneContactAttachment,
  action: GetOneContactAttachmentActionType
) => {
  switch (action.type) {
    case GET_ATTACHMENT_SUCCESS:
      return { data: action.payload };
    default:
      return state;
  }
};
