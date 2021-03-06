import { shallow, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import flushPromises from 'flush-promises';
import SnapshotsUpload from '../components/SnapshotsUpload.vue';

const createWrapper = (propsData, wrapperData) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);
          
  const wrapper = shallow(SnapshotsUpload, {
    localVue,
    propsData,
  });

  if (wrapperData) {
    wrapper.setData(wrapperData);
  } 
  
  return wrapper;
};

describe('SnapshotUpload.vue', () => {
  describe('Tests loading successfully', () => {
    const propsData = {
      requestId: 'ab27c74f73ba26561c61cbcc',
      requestName: 'name', 
    };
    const wrapper = createWrapper(propsData);
    
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Load snapshot request', () => {
    it('should display the snapshot request name', async () => {
      const propsData = {
        requestId: 'ab27c74f73ba26561c61cbcc',
        requestName: 'name', 
      };
      const wrapper = createWrapper(propsData);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find(`#${propsData.requestId}`).exists()).toBeTruthy();
    });
  });

  describe('Display image', () => {
    const wrapper = createWrapper();
    
    it('should display image when user adds image', async () => {
      // Tested behaviour is user taking photo, and seeing photo previewed on screen
      // This is done using createObjectURL to create a local URL for photo
      // As JSDOM doesn't support createObjectURL, have stubbed it to create a fake
      // image URL so that test runs
      window.URL.createObjectURL = () => 'preview_image_url';
      const imageFile = new Blob(['image'], { type: 'image/jpg' });
      wrapper.vm.addImage(imageFile);
      await flushPromises();
      await flushPromises();
      expect(wrapper.find('#snapshotImage').exists()).toBeTruthy();
    });
  });
  
  describe('Form validation on submit snapshot', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = createWrapper();
    });
  
    it('should display error, on submit, if comment not populated', (done) => {
      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(Array.isArray(wrapper.vm.commentErrors)).toBeTrue();
        expect(wrapper.vm.commentErrors).not.toBeEmpty();
        done();
      });
    });
  
    it('should display error, on submit, if image not provided', (done) => {
      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('#imageError').exists()).toBeTruthy();
        done();
      });
    });
  
    it('should be no error if comment is populated', (done) => {
      expect(Array.isArray(wrapper.vm.commentErrors)).toBeTrue();
      expect(wrapper.vm.commentErrors).toBeEmpty();

      wrapper.setData({
        snapshotData: {
          snapshot: { comment: 'data' },
        },
      });

      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(Array.isArray(wrapper.vm.commentErrors)).toBeTrue();
        expect(wrapper.vm.commentErrors).toBeEmpty();
        done();
      });
    });
  
    it('should be no error if image is provided', (done) => {
      expect(wrapper.find('#imageError').exists()).toBeFalsy();

      wrapper.setData({
        snapshotData: { 
          imageFile: 'data',
          localImageDisplay: '',
          snapshot: {
            imageUrl: '',
            comment: '',
          },
        },
      });

      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('#imageError').exists()).toBeFalsy();
        done();
      });
    });
  });
});
