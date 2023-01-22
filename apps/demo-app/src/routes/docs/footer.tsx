import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter} from 'solid-icons/bs';
import {Footer} from 'flowbite-solid/src/lib/components/Footer';
import {Component} from "solid-js";

const FooterPage: Component = () => {
    return (
        <div class="mx-auto flex max-w-4xl flex-col gap-8 dark:text-white">
            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Default Footer</span>
                <div class="py-4">
                    <Footer container>
                        <Footer.Copyright href="#" by="Flowbite™" year={2022}/>
                        <Footer.LinkGroup>
                            <Footer.Link href="#">About</Footer.Link>
                            <Footer.Link href="#">Privacy Policy</Footer.Link>
                            <Footer.Link href="#">Licensing</Footer.Link>
                            <Footer.Link href="#">Contact</Footer.Link>
                        </Footer.LinkGroup>
                    </Footer>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Footer with logo</span>
                <div class="py-4">
                    <Footer container>
                        <div class="w-full text-center">
                            <div class="w-full justify-between sm:flex sm:items-center sm:justify-between">
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
                            <Footer.Divider/>
                            <Footer.Copyright href="#" by="Flowbite™" year={2022}/>
                        </div>
                    </Footer>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Footer with social media icons</span>
                <div class="py-4">
                    <Footer container>
                        <div class="w-full">
                            <div class="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
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
                                        <Footer.Title title="about"/>
                                        <Footer.LinkGroup col>
                                            <Footer.Link href="#">Flowbite</Footer.Link>
                                            <Footer.Link href="#">Tailwind CSS</Footer.Link>
                                        </Footer.LinkGroup>
                                    </div>
                                    <div>
                                        <Footer.Title title="Follow us"/>
                                        <Footer.LinkGroup col>
                                            <Footer.Link href="#">Github</Footer.Link>
                                            <Footer.Link href="#">Discord</Footer.Link>
                                        </Footer.LinkGroup>
                                    </div>
                                    <div>
                                        <Footer.Title title="Legal"/>
                                        <Footer.LinkGroup col>
                                            <Footer.Link href="#">Privacy Policy</Footer.Link>
                                            <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                                        </Footer.LinkGroup>
                                    </div>
                                </div>
                            </div>
                            <Footer.Divider/>
                            <div class="w-full sm:flex sm:items-center sm:justify-between">
                                <Footer.Copyright href="#" by="Flowbite™" year={2022}/>
                                <div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                                    <Footer.Icon href="#" icon={BsFacebook}/>
                                    <Footer.Icon href="#" icon={BsInstagram}/>
                                    <Footer.Icon href="#" icon={BsTwitter}/>
                                    <Footer.Icon href="#" icon={BsGithub}/>
                                    <Footer.Icon href="#" icon={BsDribbble}/>
                                </div>
                            </div>
                        </div>
                    </Footer>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Footer sitemap links</span>
                <div class="py-4">
                    <Footer bgDark>
                        <div class="w-full">
                            <div class="grid w-full grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
                                <div>
                                    <Footer.Title title="Company"/>
                                    <Footer.LinkGroup col>
                                        <Footer.Link href="#">About</Footer.Link>
                                        <Footer.Link href="#">Careers</Footer.Link>
                                        <Footer.Link href="#">Brand Center</Footer.Link>
                                        <Footer.Link href="#">Blog</Footer.Link>
                                    </Footer.LinkGroup>
                                </div>
                                <div>
                                    <Footer.Title title="help center"/>
                                    <Footer.LinkGroup col>
                                        <Footer.Link href="#">Discord Server</Footer.Link>
                                        <Footer.Link href="#">Twitter</Footer.Link>
                                        <Footer.Link href="#">Facebook</Footer.Link>
                                        <Footer.Link href="#">Contact Us</Footer.Link>
                                    </Footer.LinkGroup>
                                </div>
                                <div>
                                    <Footer.Title title="legal"/>
                                    <Footer.LinkGroup col>
                                        <Footer.Link href="#">Privacy Policy</Footer.Link>
                                        <Footer.Link href="#">Licensing</Footer.Link>
                                        <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                                    </Footer.LinkGroup>
                                </div>
                                <div>
                                    <Footer.Title title="download"/>
                                    <Footer.LinkGroup col>
                                        <Footer.Link href="#">iOS</Footer.Link>
                                        <Footer.Link href="#">Android</Footer.Link>
                                        <Footer.Link href="#">Windows</Footer.Link>
                                        <Footer.Link href="#">MacOS</Footer.Link>
                                    </Footer.LinkGroup>
                                </div>
                            </div>
                            <div class="w-full bg-gray-700 py-6 px-4 sm:flex sm:items-center sm:justify-between">
                                <Footer.Copyright href="#" by="Flowbite™" year={2022}/>
                                <div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                                    <Footer.Icon href="#" icon={BsFacebook}/>
                                    <Footer.Icon href="#" icon={BsInstagram}/>
                                    <Footer.Icon href="#" icon={BsTwitter}/>
                                    <Footer.Icon href="#" icon={BsGithub}/>
                                    <Footer.Icon href="#" icon={BsDribbble}/>
                                </div>
                            </div>
                        </div>
                    </Footer>
                </div>
            </div>
        </div>
    );
}

export default FooterPage;