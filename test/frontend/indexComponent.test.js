
import { mount } from '@vue/test-utils';
import Index from '../../public/components/index.vue';
import flushPromises from 'flush-promises';

/** @type {import('@vue/test-utils').Wrapper<Vue>} */
let wrapper;

beforeEach(() => {
  wrapper = mount(Index);
});

describe('index component', () => {
  it('Render default index html', () => {
    expect(wrapper.html()).toContain(`ニャ！</button>`);
  });

  it.each([
    'http//meow.com',
    'http:meow.com/',
    'meow://meow.com',
    'http://meow/',
  ])('Wrong html input should be rejected', async (inputString) => {
      console.log(wrapper.vm.$refs.urlerror.$el.classList);
    await wrapper.find('input[type="text"]').setValue(inputString);
    await wrapper.find('button').trigger('click');
    wrapper.vm.$nextTick(() => {
      console.log(wrapper.findComponent({ ref: 'urlerror'}).find('.toast').classes());

    })

  })
});