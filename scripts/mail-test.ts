import * as mail from '../src/utils/mail';

(async (): Promise<void> => {
  try {
    await mail.send({
      to: 'sgr.raee@gmail.com',
      subject: 'This is awesome',
      markdown: '# Hello world!\n\nThis is a **markdown** message'
    });

    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
})();
