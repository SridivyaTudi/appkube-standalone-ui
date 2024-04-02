import { createSlice } from "@reduxjs/toolkit";
import {
  getElementType,
  getElementInstancesOfGivenType,
  getBiServicesFromProductCategory,
  getCloudServices,
  getInstancesServices,
  createBiMapping,
  createDepartment,
  createDepartmentWithLandingZone,
  getLandingzone,
  getLandingzoneByDepartment,
  getCommonServiceModules,
  getServicesFromServiceModule,
} from "Redux/BIMapping/BIMappingThunk";
import status from "Redux/Constants/CommonDS";

export const BIMappingSlice = createSlice({
  name: "BIMapping",
  initialState: {
    elementTypeData: {
      status: null,
      data: [],
    },
    elementInstancesOfGivenType: {
      status: null,
      data: [],
    },
    createProductFormData: {
      departmentName: "",
      productName: "",
      category: "",
      moduleName: "",
      environment: "",
    },
    biServicesFromProductCategory: {
      status: null,
      data: [],
    },
    cloudServices: {
      status: null,
      data: [],
    },
    instancesServices: {
      status: null,
      data: [],
    },
    creationBiMapping: {
      status: null,
      data: "",
    },
    creationDepartment: {
      status: null,
      data: "",
    },
    landingZones: {
      status: null,
      data: [],
    },
    creationDepartmentWithLandingZone: {
      status: null,
      data: "",
    },
    landingZonesByDepartment: {
      status: null,
      data: [],
    },
    commonServiceModulesData: {
      status: null,
      data: [],
    },
    servicesFromServiceModuleData: {
      status: null,
      data: [],
    },
  },
  reducers: {
    setProductIntoDepartment: (state, action) => {
      let createProductFormData = action.payload;
      return {
        ...state,
        createProductFormData,
      };
    },
  },
  extraReducers: {
    [getElementType.pending]: (state) => {
      return {
        ...state,
        elementTypeData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getElementType.fulfilled]: (state, action) => {
      return {
        ...state,
        elementTypeData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getElementType.rejected]: (state) => {
      return {
        ...state,
        elementTypeData: {
          status: status.FAILURE,
        },
      };
    },

    [getElementInstancesOfGivenType.pending]: (state) => {
      return {
        ...state,
        elementInstancesOfGivenType: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getElementInstancesOfGivenType.fulfilled]: (state, action) => {
      return {
        ...state,
        elementInstancesOfGivenType: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getElementInstancesOfGivenType.rejected]: (state) => {
      return {
        ...state,
        elementInstancesOfGivenType: {
          status: status.FAILURE,
        },
      };
    },

    [getBiServicesFromProductCategory.pending]: (state) => {
      return {
        ...state,
        biServicesFromProductCategory: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getBiServicesFromProductCategory.fulfilled]: (state, action) => {
      return {
        ...state,
        biServicesFromProductCategory: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getBiServicesFromProductCategory.rejected]: (state) => {
      return {
        ...state,
        biServicesFromProductCategory: {
          status: status.FAILURE,
        },
      };
    },

    [getCloudServices.pending]: (state) => {
      return {
        ...state,
        cloudServices: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getCloudServices.fulfilled]: (state, action) => {
      return {
        ...state,
        cloudServices: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getCloudServices.rejected]: (state) => {
      return {
        ...state,
        cloudServices: {
          status: status.FAILURE,
        },
      };
    },

    [getInstancesServices.pending]: (state) => {
      return {
        ...state,
        instancesServices: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getInstancesServices.fulfilled]: (state, action) => {
      return {
        ...state,
        instancesServices: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getInstancesServices.rejected]: (state) => {
      return {
        ...state,
        instancesServices: {
          status: status.FAILURE,
        },
      };
    },

    [createBiMapping.pending]: (state) => {
      return {
        ...state,
        creationBiMapping: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createBiMapping.fulfilled]: (state, action) => {
      return {
        ...state,
        creationBiMapping: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [createBiMapping.rejected]: (state) => {
      return {
        ...state,
        creationBiMapping: {
          status: status.FAILURE,
        },
      };
    },

    [createDepartment.pending]: (state) => {
      return {
        ...state,
        creationDepartment: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createDepartment.fulfilled]: (state, action) => {
      return {
        ...state,
        creationDepartment: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [createDepartment.rejected]: (state) => {
      return {
        ...state,
        creationDepartment: {
          status: status.FAILURE,
        },
      };
    },

    [getLandingzone.pending]: (state) => {
      return {
        ...state,
        landingZones: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getLandingzone.fulfilled]: (state, action) => {
      return {
        ...state,
        landingZones: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getLandingzone.rejected]: (state) => {
      return {
        ...state,
        landingZones: {
          status: status.FAILURE,
        },
      };
    },

    [createDepartmentWithLandingZone.pending]: (state) => {
      return {
        ...state,
        creationDepartmentWithLandingZone: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createDepartmentWithLandingZone.fulfilled]: (state, action) => {
      return {
        ...state,
        creationDepartmentWithLandingZone: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [createDepartmentWithLandingZone.rejected]: (state) => {
      return {
        ...state,
        creationDepartmentWithLandingZone: {
          status: status.FAILURE,
        },
      };
    },

    [getLandingzoneByDepartment.pending]: (state) => {
      return {
        ...state,
        landingZonesByDepartment: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getLandingzoneByDepartment.fulfilled]: (state, action) => {
      return {
        ...state,
        landingZonesByDepartment: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getLandingzoneByDepartment.rejected]: (state) => {
      return {
        ...state,
        landingZonesByDepartment: {
          status: status.FAILURE,
        },
      };
    },

    [getCommonServiceModules.pending]: (state) => {
      return {
        ...state,
        commonServiceModulesData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getCommonServiceModules.fulfilled]: (state, action) => {
      return {
        ...state,
        commonServiceModulesData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getCommonServiceModules.rejected]: (state) => {
      return {
        ...state,
        commonServiceModulesData: {
          status: status.FAILURE,
        },
      };
    },

    [getServicesFromServiceModule.pending]: (state) => {
      return {
        ...state,
        servicesFromServiceModuleData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getServicesFromServiceModule.fulfilled]: (state, action) => {
      return {
        ...state,
        servicesFromServiceModuleData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getServicesFromServiceModule.rejected]: (state) => {
      return {
        ...state,
        servicesFromServiceModuleData: {
          status: status.FAILURE,
        },
      };
    },
  },
});
export const { setProductIntoDepartment } = BIMappingSlice.actions;
export default BIMappingSlice.reducer;
