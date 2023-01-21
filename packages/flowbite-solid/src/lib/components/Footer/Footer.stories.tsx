import type { Meta, Story } from '@storybook/react/types-6-0';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { Footer } from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
} as Meta;

const Template: Story = ({ children }) => <Footer>{children}</Footer>;

export const DefaultFooter = Template.bind({});
DefaultFooter.storyName = 'Default';
DefaultFooter.args = {
  children: (
    <div class="flex justify-between w-full p-6">
      <Footer.Copyright href="#" by="Flowbite™" year={2022} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </div>
  ),
};

export const WithLogoFooter = Template.bind({});
WithLogoFooter.storyName = 'With Logo';
WithLogoFooter.args = {
  children: (
    <div class="w-full p-6 text-center">
      <div class="justify-between w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Brand
          href="https://flowbite.com"
          src="https://flowbite.com/docs/images/logo.svg"
          alt="Flowbite Logo"
          name="Flowbite"
        />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </div>
      <Footer.Divider />
      <Footer.Copyright href="#" by="Flowbite™" year={2022} />
    </div>
  ),
};

export const WithSocialMediaFooter = Template.bind({});
WithSocialMediaFooter.storyName = 'Social Media Icons';
WithSocialMediaFooter.args = {
  container: true,
  children: (
    <div class="w-full p-6">
      <div class="grid justify-between w-full sm:flex sm:justify-between md:flex md:grid-cols-1">
        <div>
          <Footer.Brand
            href="https://flowbite.com"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Flowbite"
          />
        </div>
        <div class="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
          <div>
            <Footer.Title title="about" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Flowbite</Footer.Link>
              <Footer.Link href="#">Tailwind CSS</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Follow us" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Github</Footer.Link>
              <Footer.Link href="#">Discord</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div class="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href="#" by="Flowbite™" year={2022} />
        <div class="flex mt-4 space-x-6 sm:mt-0 sm:justify-center">
          <Footer.Icon href="#" icon={BsFacebook} />
          <Footer.Icon href="#" icon={BsInstagram} />
          <Footer.Icon href="#" icon={BsTwitter} />
          <Footer.Icon href="#" icon={BsGithub} />
          <Footer.Icon href="#" icon={BsDribbble} />
        </div>
      </div>
    </div>
  ),
};

export const SitemapLinksFooter = Template.bind({});
SitemapLinksFooter.storyName = 'Sitemap Links';
SitemapLinksFooter.args = {
  children: (
    <div class="w-full bg-gray-800">
      <div class="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
        <div>
          <Footer.Title title="Company" />
          <Footer.LinkGroup col>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Careers</Footer.Link>
            <Footer.Link href="#">Brand Center</Footer.Link>
            <Footer.Link href="#">Blog</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Title title="help center" />
          <Footer.LinkGroup col>
            <Footer.Link href="#">Discord Server</Footer.Link>
            <Footer.Link href="#">Twitter</Footer.Link>
            <Footer.Link href="#">Facebook</Footer.Link>
            <Footer.Link href="#">Contact Us</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Title title="legal" />
          <Footer.LinkGroup col>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Title title="download" />
          <Footer.LinkGroup col>
            <Footer.Link href="#">iOS</Footer.Link>
            <Footer.Link href="#">Android</Footer.Link>
            <Footer.Link href="#">Windows</Footer.Link>
            <Footer.Link href="#">MacOS</Footer.Link>
          </Footer.LinkGroup>
        </div>
      </div>
      <div class="w-full px-4 py-6 bg-gray-700 sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href="#" by="Flowbite™" year={2022} />
        <div class="flex mt-4 space-x-6 sm:mt-0 sm:justify-center">
          <Footer.Icon href="#" icon={BsFacebook} />
          <Footer.Icon href="#" icon={BsInstagram} />
          <Footer.Icon href="#" icon={BsTwitter} />
          <Footer.Icon href="#" icon={BsGithub} />
          <Footer.Icon href="#" icon={BsDribbble} />
        </div>
      </div>
    </div>
  ),
};
