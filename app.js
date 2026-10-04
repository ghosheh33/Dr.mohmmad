import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://jyfycayhugfixdxqmmbz.supabase.co';
const supabaseKey = 'sb_publishable_vWkumLVZZBPfxtLMMHlXZw_Cv8FH6tp';
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('thankYouForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // تغيير حالة الزر لمنع الإرسال المزدوج
    submitBtn.innerText = "جاري الإرسال...";
    submitBtn.disabled = true;

    const senderName = document.getElementById('senderName').value;
    const messageText = document.getElementById('messageText').value;

    // حفظ البيانات في Supabase
    const { error } = await supabase
        .from('messages')
        .insert([
            { Name: senderName, message: messageText }
        ]);

    if (error) {
        console.error('Error saving data:', error);
        alert('حدث خطأ أثناء حفظ الرسالة. تأكد من اتصالك بالإنترنت وصلاحيات القاعدة.');
        submitBtn.innerText = "إرسال الرسالة";
        submitBtn.disabled = false;
    } else {
        // الانتقال فوراً إلى صفحة العرض عند النجاح
        window.location.href = 'message.html';
    }
});