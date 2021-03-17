
import { mount, shallowMount } from '@vue/test-utils';
import Index from '../../public/components/index.vue';
import flushPromises from 'flush-promises';

import { createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import { BootstrapVue } from 'bootstrap-vue';

const localVue = createLocalVue();

beforeAll(() => {
  localVue.use(VueRouter);
  localVue.use(BootstrapVue);
})

describe('index component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Index);
  });

  it('Render default index html', () => {
    expect(wrapper.html()).toContain(`ニャ！</button>`);
  });

  it('Changing input field should update target value', () => {
    const content = 'bruh owo';
    wrapper.find('input[type="text"]').setValue(content);
    expect(wrapper.vm.target).toBe(content);
  });

  // it.each([
  //   'http//meow.com',
  //   'http:meow.com/',
  //   'meow://meow.com',
  //   'http://meow/',
  // ])('Wrong html input should be rejected', async (inputString) => {
  //     // console.log(wrapper.vm.$refs.urlerror.$el.classList);
  //   console.log(Index.methods);
  //   return;
  //   const wrapper = shallowMount(Index, { localVue });
  //   const mockFn = jest.spyOn(Index.methods, 'submit');
  //   wrapper.find('input[type="text"]').setValue(inputString);
  //   wrapper.find('button').trigger('click');

  //   mockFn

  // })
});

describe('Test submit function', () => {
  let mockFn;
  let wrapper;

  beforeEach(() => {
    mockFn = jest.spyOn(Index.methods, 'submit');
    mockFn.mockImplementation(async () => {});
    wrapper = shallowMount(Index);
  });

  afterEach(() => {
    mockFn.mockRestore();
  })

  it('Clicking submit function should trigger submit method', async () => {
    await wrapper.find('button').trigger('click');
    expect(mockFn).toBeCalledTimes(1);
  });

  it('Pressing entry should trigger submit method', async () => {
    await wrapper.find('input[type="text"]').trigger('keydown', { key: 'Enter' });
    expect(mockFn).toBeCalledTimes(1);
  });
});