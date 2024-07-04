<script lang="ts">
    import type { ComponentType, SvelteComponent } from 'svelte'
	import type { SVGAttributes } from 'svelte/elements';
    export let inactiveIcon: ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>;
    export let activeIcon: ComponentType<SvelteComponent<SVGAttributes<SVGSVGElement>, any, any>>;
    export let text: string;
    let active = false;

    function onClick() {
        active = !active;
    }
</script>

<div class="icon">
    <button class={$$props.class} on:click={onClick}>
        <svelte:component this={active ? activeIcon:inactiveIcon}></svelte:component>
    </button>
    {#if (text !== "")}
        <div class="text">{text}</div>
    {/if}
</div>

<style lang="scss">
    .icon {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    .text {
        margin-top: 5px;
    }

    .habitCheck {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        transition: all 0.3s ease-in-out;
    }

    .habitCheck:hover {
        transform: scale(1.07);
        opacity: 50%;
    }

    .leftbarShortcut {
        background: none;
        border: none;
    }

</style>