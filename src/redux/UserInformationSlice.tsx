import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserInformationState {
  deviceid: string;
  photo: string;
  lat: string;
  log: string;
}

const initialState: UserInformationState = {
  deviceid: '',
  photo: '',
  lat: '',
  log: '',
};

export const UserInformationSlice = createSlice({
  name: 'UserInformation',
  initialState,
  reducers: {
    saveInformation: (state, action: PayloadAction<object>) => {
      const {deviceid, photo, lat, log} = action.payload;
      state.deviceid = deviceid;
      state.photo = photo;
      state.lat = lat;
      state.log = log;
      return state;
    },
  },
});

export const {saveInformation} = UserInformationSlice.actions;
export default UserInformationSlice.reducer;
