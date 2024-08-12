<script lang="ts">
    import { type ComponentType, type SvelteComponent } from 'svelte'
    import { createEventDispatcher } from 'svelte';
    import { fade, slide, scale } from 'svelte/transition';
	import type { SVGAttributes } from 'svelte/elements';
    import type { Habit } from '$src/lib/types/habits';
    export let inactiveIcon: ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>;
    export let activeIcon: ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>;
    export let text: string;
    export let active: boolean = false;
    let textable = text !== "";
    const dispather = createEventDispatcher();
    
    function onClick() {
        active = !active;
        dispather('toggle', { active })
    }
</script>

<div class="icon">
    <button class={$$props.class} on:click={onClick}>
        {#if active && textable}
            <div in:scale={{ duration: 600 }}>
                <svelte:component this={activeIcon} />
            </div>
        {:else if active && !textable}
            <div>
                <svelte:component this={activeIcon} />
            </div>
        {:else}
            {#if textable}
                <div in:scale={{ duration: 600 }}>
                    <svelte:component this={inactiveIcon} />
                </div>
            {:else}
                <div>
                    <svelte:component this={inactiveIcon} />
                </div>
            {/if}
        {/if}
    </button>
    {#if (textable)}
        <div class="text">{text}</div>
    {/if}
</div>

<style lang="scss">
    .icon {
        display: flex;
        flex-direction: row;
        gap: 5px;
        @include transition(0.3s);
        cursor: pointer;
        pointer-events: auto;
    }

    .text {
        margin-top: 5px;
    }

    .add {
        background: none;
        border: none;
        transition: all 0.3s ease-in-out;

    }

    .add:hover {
        transform: scale(1.2);
        opacity: 50%;
    }

    .dropDown {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        transition: all 0.3s ease-in-out;
        margin-left: -5.5px;
    }

    .dropDown:hover {
        opacity: 50%;
    }

    .habitCheck {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }

    .habitCheck:hover {
        transform: scale(1.07);
        opacity: 50%;
    }

    .back {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        transition: all 0.3s ease-in-out;
        width: 5px;
    }

    .back:hover {
        transform: scale(1.07);
        opacity: 50%;
    }

    .leftbarShortcut {
        background: none;
        border: none;
    }

    .largeAdd {
        background: none;
        border: none;
        transition: all 0.3s ease-in-out;
    }

    .popup-close {
        background: none;
        border: none;
        position: absolute;
        right: 2px;
        top: 3px;
        transition: all 0.3s ease-in-out;
    }

    .popup-close:hover {
        transform: scale(1.07);
        opacity: 80%;
    }
</style>