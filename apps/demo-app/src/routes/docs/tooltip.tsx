import {Component} from "solid-js";
import {Tooltip} from "flowbite-solid/src/lib/components/Tooltip";
import {Button} from "flowbite-solid/src/lib/components/Button";


const TooltipsPage: Component = () => {
    return (<div class="mx-auto flex max-w-4xl flex-col gap-8 dark:text-white">
            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Using tooltips</span>
                <div class="py-4">
                    <Tooltip content="Tooltip content">
                        <Button>Default tooltip</Button>
                    </Tooltip>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Tooltip styles</span>
                <div class="py-4">
                    <div class="flex gap-2">
                        <Tooltip content="Tooltip content" style="light">
                            <Button>Light tooltip</Button>
                        </Tooltip>
                        <Tooltip content="Tooltip content" style="dark">
                            <Button>Dark tooltip</Button>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Placement</span>
                <div class="py-4">
                    <div class="flex gap-2">
                        <Tooltip content="Tooltip content" placement="top">
                            <Button>Tooltip top</Button>
                        </Tooltip>
                        <Tooltip content="Tooltip content" placement="right">
                            <Button>Tooltip right</Button>
                        </Tooltip>
                        <Tooltip content="Tooltip content" placement="bottom">
                            <Button>Tooltip bottom</Button>
                        </Tooltip>
                        <Tooltip content="Tooltip content" placement="left">
                            <Button>Tooltip left</Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Triggering</span>
                <div class="py-4">
                    <div class="flex gap-2">
                        <Tooltip content="Tooltip content" trigger="hover">
                            <Button>Tooltip hover</Button>
                        </Tooltip>
                        <Tooltip content="Tooltip content" trigger="click">
                            <Button>Tooltip click</Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Animation</span>
                <div class="py-4">
                    <div class="flex gap-2">
                        <Tooltip content="Tooltip content" animation={false}>
                            <Button>Not animated tooltip</Button>
                        </Tooltip>
                        <Tooltip content="Tooltip content" animation="duration-150">
                            <Button>Fast animation</Button>
                        </Tooltip>
                        <Tooltip content="Tooltip content" animation="duration-300">
                            <Button>Normal speed animation</Button>
                        </Tooltip>
                        <Tooltip content="Tooltip content" animation="duration-500">
                            <Button>Slow animation</Button>
                        </Tooltip>
                        <Tooltip content="Tooltip content" animation="duration-1000">
                            <Button>Really slow animation</Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">Disable arrow</span>
                <div class="py-4">
                    <Tooltip content="Tooltip content" arrow={false}>
                        <Button>Default tooltip</Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default TooltipsPage;