import { mount, createLocalVue, config, TransitionStub } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import mockAxios from 'axios';
import SnapshotRequests from '../components/SnapshotRequests.vue';

config.stubs.transition = TransitionStub;

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),

  post: jest.fn(() => Promise.resolve({ data: {} })),

  create: jest.fn(function () {
    return this;
  }),
}));

// stubbing Window.scrollTo as scrollTo not provided in JSDOM
// stops it from throwing errors in testing
global.scrollTo = () => {};

describe('SnapshotRequests.vue', () => {
  describe('Tests loading successfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuelidate);
  
    /* eslint no-unused-vars: 0 */
    const wrapper = mount(SnapshotRequests, {
      localVue,
    });
    
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Create snapshot requests', () => {
    const snapshotRequests = [{ _id: 2, name: 'name1', sequence: 1 }];

    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: snapshotRequests,
      }));

    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuelidate);
  
    /* eslint no-unused-vars: 0 */
    const wrapper = mount(SnapshotRequests, {
      localVue,
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetModules();
      jest.clearAllMocks();
    });
    
    it('should add a snapshot request to request list', () => {
      wrapper.find('#addRequest').trigger('click');
      expect(wrapper.find('#request2').exists()).toBeTruthy();
    });
  });

  describe('Update snapshot requests', () => {
    let wrapper; 
    let snapshotRequests;

    beforeAll(() => {
      snapshotRequests = [{ _id: '', name: 'name1', sequence: 1 }, { _id: 2, name: 'name2', sequence: 2 }];

      mockAxios.get.mockImplementation(() =>
        Promise.resolve({
          data: snapshotRequests,
        }));
    });
    
    beforeEach(() => {
      const localVue = createLocalVue();
      localVue.use(Vuetify);
      localVue.use(Vuelidate);
    
      /* eslint no-unused-vars: 0 */
      wrapper = mount(SnapshotRequests, {
        localVue,
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetModules();
      jest.clearAllMocks();
    });
    
    it('should load existing snapshot requests', async () => {
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#request1').element.value).toBe(snapshotRequests[0].name);
      expect(wrapper.find('#request2').element.value).toBe(snapshotRequests[1].name);
    });

    it('should remove a snapshot request from request list', async () => {
      wrapper.find('#deleteRequest2').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#request2').exists()).toBeFalse();
    });

    it('should delete a snapshot request completely if not yet saved', async () => {
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      wrapper.find('#deleteRequest1').trigger('click');
      expect(wrapper.vm.uiRequests[0].snapshotRequest._id).toBe(2);
    });

    it('should make a snapshot request inactive if has been previously saved, without deleting it', async () => {
      await wrapper.vm.$nextTick();
      wrapper.find('#deleteRequest2').trigger('click');
      expect(wrapper.vm.uiRequests[1].snapshotRequest.status).toBe('deleted');
    });
  });

  describe('Save snapshot requests', () => {
    let wrapper; 
    let newRequests; 
    let savedRequests;
    
    beforeEach(() => {
      mockAxios.get.mockReset();
      mockAxios.post.mockReset();
      savedRequests = [{ _id: 1, name: 'save1', sequence: 1 }, { _id: 2, name: 'save2', sequence: 2 }];
      mockAxios.post.mockImplementation(() =>
        Promise.resolve({
          data: savedRequests,
        }));
      const localVue = createLocalVue();
      localVue.use(Vuetify);
      localVue.use(Vuelidate);
      localVue.use(VueRouter);
    
      /* eslint no-unused-vars: 0 */
      wrapper = mount(SnapshotRequests, {
        localVue,
        stubs: {
          transition: TransitionStub,
        },
      });

      newRequests = [{ 
        uiRequestId: 1, 
        snapshotRequest: { name: 'test', sequence: 1, status: 'active' }, 
      }, 
      {
        uiRequestId: 2, 
        snapshotRequest: { name: 'test1', sequence: 2, status: 'active' }, 
      }];

      wrapper.setData({ 
        requestIdCounter: 3,
        uiRequests: newRequests, 
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetModules();
      jest.clearAllMocks();
    });
    
    it('should send snapshot requests to API and post a success message when save successful', async () => {
      expect(wrapper.find('#successMessage').hasStyle('display', 'none')).toBe(true);
      wrapper.find('#saveRequests').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#successMessage').hasStyle('display', 'none')).toBe(false);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$data.uiRequests.length).toBe(2);
    });

    it('should update requests with any new request IDs returned by API', async () => {
      wrapper.find('#saveRequests').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$data.uiRequests[0].snapshotRequest._id).toBe(1);
    });

    it('should display error, on save, if name not populated', async () => {
      newRequests = [{ 
        uiRequestId: 1, 
        snapshotRequest: { name: '', sequence: 1, status: 'active' }, 
      }, 
      {
        uiRequestId: 2, 
        snapshotRequest: { name: '', sequence: 2, status: 'active' }, 
      }];

      wrapper.setData({ 
        requestIdCounter: 3,
        uiRequests: newRequests, 
      });
      wrapper.find('#saveRequests').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(Array.isArray(wrapper.vm.nameErrors(0))).toBeTrue();
      expect(wrapper.vm.nameErrors(0)).not.toBeEmpty();
      expect(wrapper.find('.input-group--error').exists()).toBeTruthy();
    });
  });
});
