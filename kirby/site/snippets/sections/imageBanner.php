<section class="imageBanner">
    <?php if ($data->image()->isNotEmpty()): ?>
    <?= $page->image($data->image())->url() ?>
    <?php endif ?>

    <h2 class="imageBanner-headline">
        <?= $data->text() ?>
    </h2>
</section>
