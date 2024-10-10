import config from './config';
import SharanApi from './SharanApi';

(async function () {
  const authPayload = {
    appUrl: config.appUrl,
    password: config.password,
    login: config.login
  };

  const sharanApi = new SharanApi(authPayload);
  await sharanApi.login();

  // test 1 execGet
  interface IServices {
    _id: string;
    englishName: string;
  }

  const getServices = {
    model: 'Sharan.Services'
  };

  const services = await sharanApi.execGet<IServices[]>(getServices);
  console.log('test 1: sharanApi.execGet', services[0]);

  // test 2 execPost
  const createGroupDesc = [
    {
      serverModel: 'Sharan.GroupDesc',
      action: 'update',
      objectId: '67079c6ba7fde1377d000000',
      changes: [
        {
          key: 'psyManagerEmails',
          to: 'dccece'
        },
        {
          key: 'psyExtentionTo',
          to: 'ecece'
        },
        {
          key: 'psyExtentionCC',
          to: 'ecece'
        },
        {
          key: 'iformsNonInfectious',
          to: 'veve'
        },
        {
          key: 'iformsInfectious',
          to: 'eve'
        },
        {
          key: 'hospitalizationManagerEmails',
          to: 'eve'
        },
        {
          key: 'hospiceManagerEmails',
          to: 'eve'
        },
        {
          key: 'hospiceExtentionTo',
          to: 'eve'
        },
        {
          key: 'hospiceExtentionCC',
          to: ''
        },
        {
          key: 'groupSubHe',
          to: ''
        },
        {
          key: 'groupSubEn',
          to: ''
        },
        {
          key: 'gdHebrewName',
          to: 'evev'
        },
        {
          key: 'gdExtensionRequestEmailCC',
          to: 'eeve'
        },
        {
          key: 'gdExtensionRequestEmail',
          to: 'eve'
        },
        {
          key: 'gdEnglishName',
          to: 'evev'
        }
      ],
      hasMany: [],
      belongsTo: []
    }
  ];

  const resultCreateGroupDesc = await sharanApi.execPost<any>(createGroupDesc);
  console.log('test 2: sharanApi.execGet', resultCreateGroupDesc);

  // test 3 execQuery
  interface IClinics {
    _id: string;
  }
  const getClinicsPayload = {
    client: '18b6c1b7af113b129a000000'
  };

  const clinics = await sharanApi.execQuery<IClinics[], any>('getClinics', getClinicsPayload);
  console.log('test 3: sharanApi.execQuery', clinics);

  // test 4 execDirect
  interface IResponseExportPDF {
    description?: string;
    success: boolean;
    errors?: string;
    stack?: string;
  }

  const exportPdfPayload = {
    documents: [
      {
        fileName: '[6707792d4acf146f86000000]_SharanTreatmentDvClinicalSummary__9:50:21_10-10-2024_.pdf',
        templateName: 'SharanTreatmentDvClinicalSummary',
        saveOptions: {
          documentOptions: {
            thingType: 'Sharan.Attachment',
            properties: [
              {
                propertyName: 'fileName',
                value: '[6707792d4acf146f86000000]_SharanTreatmentDvClinicalSummary__9:50:21_10-10-2024_.pdf'
              }
            ]
          },
          relateOptions: {
            relationName: 'Sharan.TreatmentTreatmentDocument',
            source: {
              propertyName: 'treatment',
              value: '6549e7665c8a2a000007cea7'
            },
            dest: {
              propertyName: 'treatmentDocument'
            }
          }
        },
        queryCondition: {
          tid: 1021903
        }
      }
    ],
    oId: 1012666,
    clientId: '',
    clientPassport: '',
    clientIdType: 'ID',
    clientCity: 'רמת גן',
    clientIdForLog: '206531980',
    startDateActual: '2024-10-09T21:00:00.00z',
    employeePostTitle: 'סיכום - סביבת פיתוח',
    login: 'admin',
    serviceType: 'home_hospitalization_clalit',
    treatmentType: 'home visit follow up',
    treatmentWay: 'home visit',
    xml: {
      __typename: 'SharanServices',
      id: '16b25c069b9e3f95a7000001',
      _id: '16b25c069b9e3f95a7000001',
      allowSendBirdChat: true,
      clalitInstituteCode: '997',
      clalitOperationCode: '404',
      clalitSharedFolder: '/home/progforce/medit/tempforsharan/',
      clalitUnitcode: '529',
      color: '#81F781',
      companyPrefix: 'SRN_test',
      csType: 'nv',
      description: null,
      doctorProcdCode: null,
      doctorProcdDetail: null,
      doctorProcdName: null,
      englishName: 'home_hospitalization_clalit',
      examinationName: null,
      externalSystem: null,
      haveHVSum: false,
      haveMushlam: false,
      havePelecard: false,
      havePsychologyVisitSummary: null,
      haveZoom: false,
      hebrewName: 'home_hospitalization_clalit',
      isClalit: true,
      isDoctorSrv: true,
      isHNSrv: true,
      isLeumit: false,
      isMeuhedet: null,
      isUrine: false,
      isXML: false,
      leumitDoctorCode: null,
      leumitNurseCode: null,
      leumitNutritionistCode: null,
      leumitOccupationalTherapyCode: null,
      leumitPhysiotherapistCode: null,
      leumitPsychologistCode: null,
      leumitSharedFolder: null,
      leumitSocialWorkerCode: null,
      leumitSpeechTherapistCode: null,
      meuhedetDoctorCode: null,
      meuhedetNurseCode: null,
      meuhedetNutritionist: null,
      meuhedetOccupationalTherapyCode: null,
      meuhedetPhysiotherapistCode: null,
      meuhedetSharedFolder: null,
      meuhedetSocialWorkerCode: null,
      meuhedetSpeechTherapistCode: null,
      nurseProcdCode: null,
      nurseProcdDetail: null,
      nurseProcdName: null,
      procdCode: null,
      procdDetail: null,
      procdName: null,
      sendBirdChatAllows: 'allowReadAndWrite',
      sentToHMO: false,
      serviceDepartment: 'home_hospitalization',
      serviceHmo: 'clalit',
      serviceManagerEmails: null,
      serviceProviderCode: null,
      serviceProviderType: null,
      sharedFolderPath: null,
      socialWorkerProcdCode: null,
      socialWorkerProcdDetail: null,
      socialWorkerProcdName: null,
      symptomCompanyPrefix: null,
      symptomDoctorProcdCode: null,
      symptomDoctorProcdDetail: null,
      symptomDoctorProcdName: null,
      symptomExaminationName: null,
      symptomNurseProcdCode: null,
      symptomNurseProcdDetail: null,
      symptomNurseProcdName: null,
      symptomProcdCode: null,
      symptomProcdDetail: null,
      symptomProcdName: null,
      symptomServiceProviderCode: null,
      symptomServiceProviderType: null,
      symptomSocialWorkerProcdCode: null,
      symptomSocialWorkerProcdDetail: null,
      symptomSocialWorkerProcdName: null,
      symptomUnitCode: null,
      symptomUnitType: null,
      unitCode: null,
      unitType: null,
      xmltreatmentTypes:
        '[\n{\n"treatmentType":"home visit - discharge",\n"displayName":"סיום טיפול לאשפוז בית",\n"code":"54",\n"post":["רופא\\ה"]\n},\n{\n"treatmentType":"home visit - discharge",\n"displayName":"אחות -ביקור יומי אשפוז בית",\n"code":"64",\n"post":["אח\\ות"]\n},\n{\n"treatmentType":"home visit follow up",\n"displayName":"אחות - ביקור יומי אשפוז בית",\n"code":"64",\n"post":["אח\\ות"]\n},\n{\n"treatmentType":"home visit follow up",\n"displayName":"רופא -ביקור יומי אשפוז בית",\n"code":"63",\n"post":["רופא\\ה"]\n},\n{\n"treatmentType":"home visit - receipt",\n"displayName":"רופא -ביקור קבלה אשפוז בית",\n"code":"63",\n"post":["רופא\\ה"]\n},\n{\n"treatmentType":"home visit - receipt",\n"displayName":"אחות -ביקור יומי אשפוז בית",\n"code":"64",\n"post":["אח\\ות"]\n},\n{\n"treatmentType":"general visit",\n"displayName":"רופא -ביקור יומי אשפוז בית",\n"code":"63",\n"post":["רופא\\ה"]\n},\n{\n"treatmentType":"general visit",\n"displayName":"אחות -ביקור יומי אשפוז בית",\n"code":"64",\n"post":["אח\\ות"]\n},\n{\n"treatmentType":"referral issuance",\n"displayName":"רופא -ביקור יומי אשפוז בית",\n"code":"63",\n"post":["רופא\\ה"]\n},\n{\n"treatmentType":"referral issuance",\n"displayName":"אחות -ביקור יומי אשפוז בית",\n"code":"64",\n"post":["אח\\ות"]\n}]',
      success: true
    },
    sendMail: {
      MailId: '6549e7665c8a2a000007cea7',
      tId: 1021903
    },
    clinicEmail: 'taltalr30@gmail.com',
    creator: 'אחות 0',
    host: 'http://localhost:3107/',
    extensionEnable: false,
    extensionDate: null,
    extension: false,
    psyExtenEndDate: null,
    psyExtenStartDate: null,
    psyExtension: false,
    psyExtensionEnable: false,
    psyPacksName: '',
    psyExtenReason: '',
    hospiceExtenEndDate: null,
    hospiceExtenStartDate: null,
    isHospiceExtension: false,
    hospiceExtensionEnable: false,
    hospicePacksName: '',
    hospiceExtenReason: '',
    clientName: 'טסט טסט',
    hmoFileNameFrom: ''
  };

  const resultExportPdf = await sharanApi.execDirect<IResponseExportPDF, any>('ExportPDF', exportPdfPayload);
  console.log('test 4: sharanApi.execDirect', resultExportPdf);

  // test 4 execRequest
  const query = {
    action: 'ReadByQuery',
    method: 'SharanClientsServices',
    data: [
      {
        page: 1,
        start: 0,
        limit: 25,
        sort: [
          {
            property: 'csid',
            direction: 'DESC'
          }
        ]
      }
    ],
    type: 'rpc',
    tid: 264
  };

  const clientsServices = await sharanApi.execRequest<any>(query);
  console.log('test 5: sharanApi.execRequest', clientsServices);
})();
